import omitBy from "lodash/fp/omitBy"
import flow from "lodash/flow";
import defaults from "lodash/fp/defaults";
import {
    fromJS,
    Map
} from "immutable";


export const bucket = flow([
    omitBy( value => typeof value !== "string" || value.length === 0 ),
    defaults({
        baseURL: null,
        name: null
    }),
]);


export const makeURL = bucket => bucket.baseURL + "/" + bucket.name

export const makeId = flow([
    makeURL,
    encodeURIComponent,
    btoa
]);

export const fromURLAndName = ( { baseURL, name } ) => {

    const _default = bucket({ baseURL, name });
    return {
        ..._default,
        id: makeId(_default)
    };

}

/*
 * Takes an object and return an immutable data structure
 * correspond to that object.
 *
 */
export const fromObject = ( { baseURL, name } = {} ) => {

    const _default = bucket({ baseURL, name });
    return fromJS({
        ..._default,
        id: makeId(_default)
    });

};

export const toDoc = bucket => {

    if ( !Map.isMap(bucket) ) {

        return fromJS({

            _id: bucket.id,
            data: bucket,
            type: "bucket"

        });

    } else {

        return Map({

            _id: bucket.get("id"),
            data: bucket,
            type: "bucket"

        });

    }

};
