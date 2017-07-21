import {
    makeId,
} from "./data";
import {
    // LIST_DIRS,
    // LIST_CONTENT,
    // SAVE,
    // SAVE_ALL,
    ADD_BUCKET,
    // SAVE_BUCKET,
    DELETE_ALL
} from "./actions";



const defaultState = () => ({
});


export function reducer ( state = defaultState(), action ) {

    const { type, data } = action;
    switch ( type ) {

        case ADD_BUCKET:
            return {
                ...state,
                [ makeId(data) ]: data
            };
        case DELETE_ALL:
            return defaultState();
        default:
            return state;

    }

}
