import xs from "xstream";
import {
    UPDATE_DOC,
    DOC_UPDATED
} from "data/db";
import {
    TAG_DOC,
} from "./actions";
import { withType } from "data/commons";
import { Set, Map } from "immutable";
import { createStreamMiddleware } from "data/streamMiddleware";
import { makeId } from "./data";


const creator = ( action$, state$ ) => {

    const dbByType$ = state$
        .map( state => state.db.byType )


    return action$
        .filter(withType(TAG_DOC))
        .mapTo({ type: "noop" })

};


export const middleware = createStreamMiddleware(creator, "tags");
