import xs from "xstream";
import {
    UPDATE_DOC,
    // DOC_UPDATED
} from "data/db";
import {
    TAG_DOC,
    TOGGLE_DOC_TAG
} from "./actions";
import { withType } from "data/commons";
// import { Set, Map } from "immutable";
import { createStreamMiddleware } from "data/streamMiddleware";
// import { makeId } from "./data";


const creator = ( action$, state$ ) => {

    const dbByType$ = state$
        .map( state => state.db.byType )

    const tag$ = action$
        .filter(withType(TAG_DOC))
        .map(action => {


            const { doc, tag } = action.data;

            return {
                type: UPDATE_DOC,
                data: {
                    doc: doc.updateIn(["tag", tag], () => true)
                }
            };


        });

    const toggle$ = action$
        .filter(withType(TOGGLE_DOC_TAG))
        .map(action => {


            const { doc, tag } = action.data;

            return {
                type: UPDATE_DOC,
                data: {
                    doc: doc.updateIn([ "tag", tag ], false, value => !value)
                }
            };


        });

    return xs.merge(
        tag$,
        toggle$
    );
};


export const middleware = createStreamMiddleware(creator, "tags");
