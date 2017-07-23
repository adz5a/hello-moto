import {
    LOAD_TAGS,
    CREATE_TAG,
    DELETE_ALL,
} from "./actions";
import { updateById } from "data/commons";
import { makeId } from "./data";



export const defaultState = () => ({});


export const updateTags = updateById(makeId);

export function reducer ( state = defaultState(), action ) {

    const { type, data } = action;


    switch ( type ) {

        case LOAD_TAGS:
            return updateTags({ ...state }, data);

        case CREATE_TAG:
            return updateTags({ ...state }, [data]);

        case DELETE_ALL:
            return defaultState();

        default:
            return state;

    }

}
