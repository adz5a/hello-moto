import {
    ACTIONFACTORY,
} from "data/commons";
import {
    baseURL,
    bucketName
} from "./commons";

const ACTION = ACTIONFACTORY("aws");
export const LOAD = ACTION("load");
export const LIST_BUCKET_CONTENT = ACTION("list-bucket-content");


const defaultState = {
    baseURL,
    bucketName,
    data: {
        contents: [],
        name: "",
        nextContinuationToken: null,
        keyCount: -1,
        maxKeys: -1,
        isTruncated: false,
    }
};


export function reducer ( state = defaultState, action ) {

    switch ( action.type ) {


        case LOAD:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.data
                }
            };


        default:
            return state;

    }

}
