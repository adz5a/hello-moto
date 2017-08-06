import xs from "xstream";


export const awaitPromises = promise$ => promise$
    .map(xs.fromPromise)
    .flatten();

