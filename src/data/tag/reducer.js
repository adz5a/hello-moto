import { FOUND_DOC } from "data/db";
import { Map } from "immutable";


const EmptyMap = Map();
export function reducer ( state = EmptyMap, action ) {


    const { data, type } = action;

    switch ( type ) {


        case FOUND_DOC:
            return state;


        default:
            return state;

    }

}
