import { createStreamMiddleware } from "data/streamMiddleware";
import {
    FIND_DOC
} from "data/db";
import xs from "xstream";
import {
    Map 
} from "immutable";


export const creator = ( action$, state$ ) => {

    return xs.of({
        type: FIND_DOC,
        data: {
            query: Map({
                selector: {
                    type: "image"
                }
            })
        }
    })

};


export const middleware = createStreamMiddleware(creator, "image");
