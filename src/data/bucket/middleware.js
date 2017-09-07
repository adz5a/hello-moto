import xs from "xstream";
// import dropRepeats from "xstream/extra/dropRepeats";
import { createStreamMiddleware } from "data/streamMiddleware";
import {
    // FIND_DOC,
    ADD_BULK,
    ADD_BULK_RESPONSE
} from "data/db";
import {
    LIST_CONTENT,
    LIST_CONTENT_RESPONSE,
    LIST_ALL_CONTENT,
    SAVE_ALL,
    SAVE_ALL_RESPONSE
} from "./actions";
import { 
    fromJS,
    Map,
    List
} from "immutable";
import { withType } from "data/commons";
import { listBucket } from "data/xml.utils";
import { 
    contentType
} from "data/link";
import { awaitPromises } from "components/stream";
import {
    bucket
} from "./data";


// const onStart = () => xs.of({
//         type: FIND_DOC,
//         data: {
//             query: fromJS({
//                 selector: {
//                     type: "bucket"
//                 }
//             })
//         }
//     });


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
            const name = bucket.get("name");


            return {
                nextContinuationToken,
                contents: List(newContents.map(item => {

                    const url = [ baseURL, name, item.Key ]
                        .map( s => s.trim() )
                        .join("/");
                    return Map({
                        id: bucket.encode(url),
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
    .compose(awaitPromises())
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

            const { bucket } = action.data;


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


const saveAll = state$ => action$ => {

    return action$
        .filter(withType(SAVE_ALL))
        .map(action => action.data )
        .map(({ bucket }) => {

            const id = bucket.get("id");

            return state$
                .take(1)
                .map(state => {

                    const data = state.buckets.get(id);
                    const contents = data.get("contents");

                    const links = contents.map(item => {

                        const _id = item.get("id");
                        return Map({
                            data: Map({
                                id: _id,
                                url: item.get("url"),
                                size: item.get("size")
                            }),
                            _id,
                            type: item.get("contentType")
                        });

                    });


                    const response$ = action$
                        .filter(withType(ADD_BULK_RESPONSE))
                        .map( action => action.data )
                        .filter( data => data.data === links )



                    return response$
                        .take(1)
                        .map(response => {

                            return {
                                type: SAVE_ALL_RESPONSE,
                                data: response
                            };

                        })
                        .startWith({
                            type: ADD_BULK,
                            data: { data: links }
                        });


                });

        })
        .flatten()
        .flatten();

}


const creator = ( action$, state$ ) => {


    const list$ = action$
        .filter(withType(LIST_CONTENT))
        .compose(list);

    const listAll$ = action$
        .compose(listAll(state$));

    const saveAll$ = action$
        .compose(saveAll(state$));

    return xs.merge(
        list$,
        listAll$,
        saveAll$
    );

};


export const middleware = createStreamMiddleware(creator, "bucket");
