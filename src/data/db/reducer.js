import {
    FETCH_DOC_BY_ID,
    FIND_DOC
} from "./actions";

export const defaultState = () => ({});
export function reducer ( state = {}, action ) {

    const { type, data } = action;


    switch ( type ) {

        default:
            return state;

    }

}
