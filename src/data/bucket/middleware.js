import xs from "xstream";
import delay from "xstream/extra/delay";
import { createStreamMiddleware } from "data/streamMiddleware";
import {
    FIND_DOC
} from "data/db";
import { fromJS } from "immutable";


const onStart = () => xs.of({
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


const creator = action$ => {

    

    return onStart();
};
export const middleware = createStreamMiddleware(creator, "bucket");
