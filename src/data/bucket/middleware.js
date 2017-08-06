import xs from "xstream";
// import dropRepeats from "xstream/extra/dropRepeats";
import { createStreamMiddleware } from "data/streamMiddleware";
import {
    FIND_DOC
} from "data/db";
import {
    LIST_CONTENT,
    LIST_CONTENT_RESPONSE,
    LIST_ALL_CONTENT
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

    // console.log("called");
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

        const { 
            nextContinuationToken,
            bucket = {}
        } = data

        return {
            bucket: fromJS(bucket),
            nextContinuationToken
        };

    })
    .map(getList)
    .compose(awaitPromises)
    .map(data => {

        // console.log(data);
        return {
            type: LIST_CONTENT_RESPONSE,
            data
        };

    });


const listAll = state$ => action$ => {




    return action$
        .filter(withType(LIST_ALL_CONTENT))
        .map(action => {

            const { bucket } = action.data;


            // operator : will select the relevant
            // bucket in store.buckets
            // will drop every non update event
            const getBucketStatus = state$ => state$
                .map( state => state.buckets )
                .map( buckets => buckets.get(bucket.get("id")) )


            const response$ = action$
                .filter(withType(LIST_CONTENT_RESPONSE))
                .map( action => action.data )
                .filter( response => {

                    return response.bucket.get("id") === bucket.get("id")

                } );




                
            return state$
                .compose(getBucketStatus)
                .take(1)
                .map( status => {

                    
                    const done$ = response$
                        .filter( response => response.isTruncated === false )
                        .take(1);

                    const unfinished$ = response$
                        .filter( response => response.isTruncated === true )
                        .map( ({ nextContinuationToken }) => {

                            return {

                                type: LIST_CONTENT,
                                data: { bucket, nextContinuationToken }

                            };

                        } )
                        .endWhen(done$);



                    if ( status === undefined ) {

                        return unfinished$
                            .startWith({
                                type: LIST_CONTENT,
                                data: { bucket }
                            });

                    } else {

                        return unfinished$;

                    }
                });

        })
        .flatten()
        .flatten();


}

const creator = ( action$, state$ ) => {

    const start$ = onStart();


    const list$ = action$
        .filter(withType(LIST_CONTENT))
        .compose(list);

    const listAll$ = action$
        .compose(listAll(state$));

    return xs.merge(
        start$,
        list$,
        listAll$
    );

};


export const middleware = createStreamMiddleware(creator, "bucket");
