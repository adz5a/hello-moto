import xs from "xstream";
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
    });


const creator = action$ => {

    

    return onStart();
};
export const middleware = createStreamMiddleware(creator, "bucket");
