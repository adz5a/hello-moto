import xs from "xstream";
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
        .map(action => {

            const { bucket } = action.data;

            const selectBucket = state$ => state$
                .map( state => state.buckets )
                .map( buckets => buckets.get(bucket.get("id")) );
            

                
            const full$ = state$
                .compose(selectBucket)
                .filter( bucket => bucket !== undefined )
                .filter( bucket => bucket.get("isTruncated") !== true && !bucket.get("loading") );

            const truncated$ = state$
                .compose(selectBucket)
                .filter( bucket => bucket !== undefined )
                .filter( bucket => bucket.get("isTruncated") === true )
                .filter( bucket => bucket.get("loading") === false );


            return state$
                .compose(selectBucket)
                .take(1)
                .map( currentBucket => {

                    const newActions$ = truncated$
                        .map(currentBucket => {

                            return {
                                type: LIST_CONTENT,
                                data: {
                                    bucket: currentBucket,
                                    nextContinuationToken: currentBucket.get("nextContinuationToken"),
                                }
                            };

                        })
                        .endWhen(full$);

                    if ( currentBucket === undefined ) {

                        return newActions$
                            .startWith({
                                type: LIST_CONTENT,
                                data: {
                                    bucket,
                                }
                            });

                    } else {

                        return newActions$;

                    }

                } );
                

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
        .filter(withType(LIST_ALL_CONTENT))
        .compose(listAll(state$));

    return xs.merge(
        start$,
        list$,
        listAll$
    );

};


export const middleware = createStreamMiddleware(creator, "bucket");
