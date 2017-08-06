import omitBy from "lodash/fp/omitBy"
import flow from "lodash/flow";
import defaults from "lodash/fp/defaults";
import {
    fromJS,
    Map
} from "immutable";


/*
 * Takes an object and return an immutable data structure
 * correspond to that object.
 *
 */
export const fromObject = flow([
    omitBy( value => typeof value !== "string" || value.length === 0 ),
    defaults({
        baseURL: null,
        name: null
    }),
    bucket => fromJS({
        ...bucket,
        id: makeId(bucket)
    })
]);


export const makeURL = bucket => bucket.baseURL + "/" + bucket.name

export const makeId = flow([
    encodeURIComponent,
    btoa
]);

export const fromURLAndName = fromObject;

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
