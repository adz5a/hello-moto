import { combineReducers } from "redux";
import { Set } from "immutable";
import {
    SELECT,
    DESELECT
} from "./actions";


export function selection ( state = Set(), action ) {

    const { type, data } = action;

    switch ( type ) {

        case SELECT: {
            const { doc } = data;
            return state.add(doc.get("_id"));

        }

        case DESELECT: {

            const { doc } = data;
            return state.remove(doc.get("_id"));

        }


        default:
            return state;

    }

}


export const reducer = combineReducers({
    selection
});
