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
export const ADD_BUCKET = ACTION("add-bucket");
export const SAVE_BUCKET = ACTION("save-bucket");


const defaultState = () => ({
});

export const bucket = flow([
    omitBy( value => typeof value !== "string" || value.length === 0 ),
    defaults({
        baseURL: null,
        name: null
    }),
]);


export const makeId = bucket => bucket.baseURL + "/" + bucket.name;
export const makeURL = makeId;

export const contentType = url => {
    const extension = url.split(".");

    switch ( extension[extension.length - 1]) {

        case "jpg":
        case "png":
            return "image";
            
        case "mp3":
            return "music";

        case "mp4":
            return "video";

        default:
            return null;

    }
};
export function reducer ( state = defaultState(), action ) {

    const { type, data } = action;
    switch ( type ) {

        case ADD_BUCKET:
            return {
                ...state,
                [ makeId(data) ]: data
            };
        default:
            return state;

    }

}
