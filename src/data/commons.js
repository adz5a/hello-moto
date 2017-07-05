export const sanitizeURL = url => btoa(encodeURI(url));
export const deSanitizeURL = url => decodeURI(atob(url));

export function ACTIONFACTORY ( namespace ) {

    return ( ...strings ) => [ namespace ].concat(strings).join("/").toUpperCase();

}

export function fromMiddleware ( meta = {} ) {

    return {
        ...meta,
        origin: "middleware"
    };

}

// checks if a side effect can be performed on this 
// action
export function isSafe ( action = {} ) {

    const { meta } = action;

    // all actions emitted by a middleware must have a meta key
    if ( typeof meta !== "object" || meta === null ) {

        return true;

    } else {

        // it means that this action is in itself
        // a side effect
        return meta.origin !== "middleware";

    }


}


const GLOBAL_ACTION = ACTIONFACTORY("global");
export const PROCESSING = GLOBAL_ACTION("processing");
