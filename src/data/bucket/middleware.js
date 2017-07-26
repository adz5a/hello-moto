import xs from "xstream";
import delay from "xstream/extra/delay";
import { createStreamMiddleware } from "data/streamMiddleware";
import {
    FIND_DOC
} from "data/db";
import { fromJS } from "immutable";




// const db = new PouchDB("__db__");





// const loadBuckets = loadType("bucket");



const init = {
    onStart( dispatch ) {


        dispatch({
            type: FIND_DOC,
            data: {
                query: {
                    selector: {
                        type: "bucket"
                    }
                }
            }
        });


    }
};

const creator = action$ => {

    const onStart$ = xs.of({
        type: FIND_DOC,
        data: {
            query: fromJS({
                selector: {
                    type: "bucket"
                }
            })
        }
    })
    .compose(delay(1));

    return onStart$;
};
export const middleware = createStreamMiddleware(creator, "bucket");
