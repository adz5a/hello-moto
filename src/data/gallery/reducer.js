import { combineReducers } from "redux";
import {
    OPEN_TAG_MODAL,
    CLOSE_TAG_MODAL
} from "./actions";


export function tagModale ( state = { show: false }, action ) {

    const { type, data } = action;

    switch ( type ) {

        case OPEN_TAG_MODAL: {
            const { doc } = data;
            return {
                show: true,
                doc
            };

        }

        case CLOSE_TAG_MODAL: {

            return {
                ...state,
                show: false,
            };

        }


        default:
            return state;

    }

}


export const reducer = combineReducers({
    tagModale
});
