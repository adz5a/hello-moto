import { LIST_CONTENT } from "data/bucket";
import reduce from "lodash/fp/reduce";
import {
    makeId,
} from "./data";


export const updateLinkList = reduce( (state = {}, link) => {

    state[makeId(link)] = link;
    return state;

});

export const defaultState = () => ({});

export function reducer ( state = defaultState(), action ) {

    const { type, data } = action;
    switch ( type ) {

        case LIST_CONTENT:{

            return updateLinkList({ ...state }, data.links);

        }

        default:
            return state;

    }

}
