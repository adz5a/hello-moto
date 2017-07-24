import omitBy from "lodash/fp/omitBy"
import flow from "lodash/flow";
import defaults from "lodash/fp/defaults";


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
