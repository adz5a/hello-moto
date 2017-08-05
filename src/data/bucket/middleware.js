import xs from "xstream";
import { createStreamMiddleware } from "data/streamMiddleware";
import {
    FIND_DOC
} from "data/db";
import {
    LIST_CONTENT,
    LIST_CONTENT_RESPONSE
} from "./actions";
import { 
    fromJS,
    Map,
    List
} from "immutable";
import { withType } from "data/commons";
import { listBucket } from "data/xml.utils";
import { 
    contentType
} from "data/link";
import { awaitPromises } from "components/stream";


const onStart = () => xs.of({
        type: FIND_DOC,
        data: {
            query: fromJS({
                selector: {
                    type: "bucket"
                }
            })
        }
    });


const getList = ({
    bucket = Map(),
    nextContinuationToken: continuationToken,
}) => {

    console.log("called");
    // console.log(bucket.get("baseURL"));
    // console.log(bucket.get("name"));

    return listBucket({
        baseURL: bucket.get("baseURL"),
        name: bucket.get("name"),
        continuationToken
    })
        .then(({
             contents: newContents,
            nextContinuationToken,
            isTruncated
        }) => {

            const baseURL = bucket.get("baseURL");


            return {
                nextContinuationToken,
                contents: List(newContents.map(item => {

                    const url = baseURL + "/" + item.Key;
                    return Map({
                        url,
                        size: item.Size,
                        lastModified: item.LastModified,
                        contentType: contentType({ url })
                    });

                })),
                bucket,
                isTruncated
            };

        });

}

const list = list$ => list$
    .map( action => {

        const { data } = action;


        const bucket = data.bucket || {};
        return {
            bucket: fromJS(bucket)
        };

    })
    .map(getList)
    .compose(awaitPromises)
    .map(data => {

        console.log(data);
        return {
            type: LIST_CONTENT_RESPONSE,
            data
        };

    });


const creator = action$ => {

    const start$ = onStart();


    const list$ = action$
        .filter(withType(LIST_CONTENT))
        .compose(list);


    return xs.merge(
        start$,
        list$
    );

};


export const middleware = createStreamMiddleware(creator, "bucket");
