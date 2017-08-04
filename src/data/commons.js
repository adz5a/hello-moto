// import reduce from "lodash/fp/reduce";


export const sanitizeURL = url => btoa(encodeURI(url));
export const deSanitizeURL = url => decodeURI(atob(url));

export function ACTIONFACTORY ( namespace ) {

    return ( ...strings ) => [ namespace ].concat(strings).join("/").toUpperCase();

}
