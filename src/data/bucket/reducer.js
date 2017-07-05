import {
    ACTIONFACTORY
} from "./../commons";

const ACTION = ACTIONFACTORY("bucket");

export const LIST_DIRS = ACTION("list-dirs");
export const LIST_CONTENT = ACTION("list-content");
export const SAVE = ACTION("save");


const defaultState = {
    saved: false,
    baseURL: null,
    bucket: null
};


export function reducer ( state = defaultState, action ) {

    const { type, data } = action;

    switch ( type ) {

        default:
            return state;

    }

}
