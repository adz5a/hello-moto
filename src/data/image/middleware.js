import { createStreamMiddleware } from "data/streamMiddleware";
import {
    FIND_DOC
} from "data/db";
import xs from "xstream";
import {
    Map 
} from "immutable";


export const creator = ( action$, state$ ) => {

    return xs.never();

};


export const middleware = createStreamMiddleware(creator, "image");
