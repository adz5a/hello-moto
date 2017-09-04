import {
    // Seq,
    // List,
    // Repeat,
    Map
} from "immutable";


export const sanitizeURL = url => btoa(encodeURI(url));
export const deSanitizeURL = url => decodeURI(atob(url));

export function ACTIONFACTORY ( namespace ) {

    return ( ...strings ) => [ namespace ].concat(strings).join("/").toUpperCase();

}

export const Doc = args => {

    const doc = Map(args);

    if ( typeof doc.get("_id") !== "string" ) {

        throw new Error("Document must have a string id");

    }

    return doc;

}


export const withType = type => action => action.type === type;
