export const makeId = link => link.url;

export const link = flow([
    defaults({ 
        url: null, // should not be null
        contentType: null, // can be null
        origin: null // can be null
    }),
]);


export function reducer ( state = {} ) {

    return state;

}
