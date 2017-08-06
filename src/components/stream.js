import xs from "xstream";


export const awaitPromises = promise$ => promise$
    .map(xs.fromPromise)
    .flatten();


export const takeUntil = predicate => stream$ => {

    const end$ = stream$
        .filter(predicate)
        .take(1);

    return stream$
        .endWhen(end$);

};


export const reduce = fold => stream$ => {

    return stream$
        .take(1)
        .map( initialValue => stream$.fold(fold, initialValue) )
        .flatten();

};
