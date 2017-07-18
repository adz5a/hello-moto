import {
    ACTIONFACTORY
} from "./../commons";
import defaults from "lodash/fp/defaults";
import mapValues from "lodash/fp/mapValues";
import isString from "lodash/isString";
import omitBy from "lodash/fp/omitBy"
import flow from "lodash/flow";

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

export const bucket = flow([
    omitBy( value => typeof value !== "string" || value.length === 0 ),
    defaults({
        baseURL: null,
        name: null
    }),
]);

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
