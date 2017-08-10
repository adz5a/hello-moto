import { UPDATE_TAG_LIST } from "./actions";
import { DOC_UPDATED } from "data/db";
import { Map, Set } from "immutable";
import { combineReducers } from "redux";


const EmptyMap = Map();


const insertDocTags = _id =>( state, hasTag, tagName ) => {

    return state.update(
        tagName,
        Set(),
        set => hasTag ?
        set.add(_id):
        set.remove(_id)
    )

};


export function byName ( state = EmptyMap, action ) {


    const { data, type } = action;

    switch ( type ) {


            // this action is merely an alias for QUERY_DONE
            // from the DB
            // but because we don't want every tag query
            // intercepted we use the  meta { nextActionType }
            // field on the action to transform it
        case UPDATE_TAG_LIST: {

            const { response } = data;
            return response.reduce(( state, doc ) => {

                const _id = doc.get("_id");
                return doc.get("tag", Map()).reduce( insertDocTags(_id), state );

            }, state);

        }


        case DOC_UPDATED: {

            const { doc, response } = data;

            if ( response.ok ) {

                const _id = doc.get("_id");
                return doc.get("tag", Map()).reduce( insertDocTags(_id), state );

            } else {

                return state;

            }


        }



        default:
            return state;

    }

}


export const reducer = combineReducers({ byName });
