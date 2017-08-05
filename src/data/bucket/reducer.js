import {
    LIST_CONTENT,
    LIST_CONTENT_RESPONSE,
    LIST_NEXT_CONTENT,
} from "./actions";
import {
    Map,
    List
} from "immutable";
import reduce from "lodash/fp/reduce";




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

            return state
                .update(
                    bucket.get("id"),
                    bucket,
                    bucket => bucket
                    .set("continuationToken", bucket.get("continuationToken"))
                    .set("loading", false)
                    .update(
                        "contents",
                        List(),
                        oldContents => oldContents.concat(contents))
                );


        }

        case LIST_CONTENT: {

            const {
                bucket
            } = data;


            return state
                .update(
                    bucket.get("id"),
                    bucket,
                    bucket => bucket
                        .set("loading", true)
                );

        }

        default:
            return state;

    }


}
