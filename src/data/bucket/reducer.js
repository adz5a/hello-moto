import {
    ACTIONFACTORY
} from "./../commons";
import defaults from "lodash/fp/defaults";

const ACTION = ACTIONFACTORY("bucket");

export const LIST_DIRS = ACTION("list-dirs");
export const LIST_CONTENT = ACTION("list-content");
export const SAVE = ACTION("save");
export const SAVE_ALL = ACTION("save-all");


const defaultState = () => ({
    saved: false,
    baseURL: null,
    bucket: null,
    prefixes: {},
    contents: null
});

const bucket = defaults({
    baseURL: null,
    name: null
});

export function reducer ( state = defaultState(), action ) {

    const { type, data } = action;

    switch ( type ) {


        case LIST_DIRS:
            return {
                ...state,
                prefixes: data.prefixes,
                baseURL: data.baseURL,
                bucket: data.bucket
            };

        case LIST_CONTENT:
            return {
                ...state,
                baseURL: data.baseURL,
                bucket: data.bucket,
                contents: data.contents
            };

        default:
            return state;

    }

}
