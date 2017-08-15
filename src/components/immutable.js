import {
    Map
} from "immutable";


export const unwrapMap = data => {

    if ( Map.isMap(data) ) {

        return data.toJS();

    } else {

        return data;

    }

};


export const toJS = obj => {

    if ( Object.hasOwnProperty("toJS", obj) ) {

        try {
            return obj.toJS();
        } catch ( e ) {
            return obj;
        }

    } else {

        return obj;

    }

};
