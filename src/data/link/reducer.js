import { LIST_CONTENT } from "data/bucket";
import reduce from "lodash/fp/reduce";
import flow from "lodash/flow";
import defaults from "lodash/fp/defaults";

export const makeId = link => link.url;
export const link = flow([
    defaults({ 
        url: null, // should not be null
        contentType: null, // can be null
    }),
]);

const updateLinkList = reduce( (state, link) => {

    state[makeId(link)] = link;
    return state;

});
export const defaultState = () => ({});

export function reducer ( state = defaultState(), action ) {

    const { type, data } = action;
    switch ( type ) {

        case LIST_CONTENT:
            return updateLinkList({ ...state }, data);

        default:
            return state;

    }

}
