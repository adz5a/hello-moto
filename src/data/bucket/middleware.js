import xs from "xstream";
import { createStreamMiddleware } from "data/streamMiddleware";
import {
    FIND_DOC
} from "data/db";
import {
    LIST_CONTENT,
} from "./actions";
import { fromJS } from "immutable";
import { withType } from "data/commons";


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


const list = list$ => list$
    
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
