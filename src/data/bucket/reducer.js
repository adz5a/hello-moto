import {
    // makeId,
} from "./data";
import {
    // LIST_DIRS,
    LIST_CONTENT,
    LIST_NEXT_CONTENT,
    // SAVE,
    // SAVE_ALL,
    // ADD_BUCKET,
    // SAVE_BUCKET,
    // DELETE_ALL
} from "./actions";
import reduce from "lodash/fp/reduce";



const defaultState = () => ({
});


export function reducer ( state = defaultState(), action ) {

    const { type, } = action;
    switch ( type ) {

        // case ADD_BUCKET:
        //     return {
        //         ...state,
        //         [ makeId(data) ]: data
        //     };
        // case DELETE_ALL:
        //     return defaultState();

        // case LIST_NEXT_CONTENT:
        // case LIST_CONTENT:{

        //     const { bucket } = data;

        //     if ( state[bucket.id] ) {

        //         console.log("yolo");
        //         return {
        //             ...state,
        //             [bucket.id]: {
        //                 ...bucket,
        //                 links: links(bucket.links, action)
        //             }
        //         };

        //     } else return state;

        // }
        default:
            return state;

    }

}

const defaultLinks = () => ({
    links: {},
    status: null
});


const mergeLinks = reduce(( links, link ) => {

    links[link.id] = link;
    return links;

})


export function links ( state = defaultLinks(), action ) {

    const { type, data } = action;

    switch ( type ) {

        case LIST_NEXT_CONTENT:
        case LIST_CONTENT:{

            const { links, status } = data;

            return {
                ...state,
                links: mergeLinks({ ...state.links }, links),
                status
            };

        }

        default:
            return state;

    }
}
