import reduce from "lodash/fp/reduce";
import {
    makeId,
} from "./data";
import {
    LOAD_LINKS
} from "./actions";

export const updateLinkList = reduce( (state = {}, link) => {

    state[makeId(link)] = link;
    return state;

});

export const defaultState = () => ({});

export function reducer ( state = defaultState(), action ) {

    const { type, data } = action;
    switch ( type ) {


        case LOAD_LINKS:{

            return updateLinkList({ ...state }, data);
        }

        default:
            return state;

    }

}
