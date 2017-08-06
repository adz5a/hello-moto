import {
    LIST_CONTENT,
    LIST_CONTENT_RESPONSE,
} from "./actions";
import {
    Map,
    List
} from "immutable";




export function reducer ( state = Map(), action ) {


    const { type, data } = action


    switch ( type ) {


        case LIST_CONTENT_RESPONSE: {


            const { 
                bucket,
                isTruncated,
                contents,
                nextContinuationToken
            } = data;


            if ( !Map.isMap(bucket) ) {

                return state;

            } else {

                return state
                    .update(
                        bucket.get("id"),
                        bucket,
                        bucket => bucket
                        .set("nextContinuationToken", nextContinuationToken)
                        .set("isTruncated", isTruncated)
                        .set("loading", false)
                        .update(
                            "contents",
                            List(),
                            oldContents => oldContents.concat(contents))
                    );

            }

        }

        case LIST_CONTENT: {

            const {
                bucket
            } = data;

            if ( !Map.isMap(bucket) ) {

                return state;

            } else {

                return state
                    .update(
                        bucket.get("id"),
                        bucket,
                        bucket => bucket
                        .set("loading", true)
                    );

            }


        }

        default:
            return state;

    }


}
