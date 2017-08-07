import xs from "xstream";
import flattenSequentially from "xstream/extra/flattenSequentially";
import flattenConcurrently from "xstream/extra/flattenConcurrently";
import concat from "xstream/extra/concat";


export const awaitPromises = ( concurrent = true ) => promise$ => promise$
    .map(xs.fromPromise)
    .compose( concurrent ? flattenConcurrently: flattenSequentially);


export const flattenPromises = promise$ => promise$
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


export const withGenerator = (gen, arg) => stream$ => {

    return xs.create({
        start ( listener ) {

            let iterator;
            if ( arg !== undefined ) {

                iterator = gen(arg);

            } else {

                iterator = gen();

            }

            this.iterator = iterator;

            const _listener = {
                next ( event ) {

                    let didThrow = false;
                    let value;
                    try {

                        value = iterator.next(event);

                    } catch ( e ) {

                        didThrow = true;
                        listener.error(e);

                    }


                    listener.next(value.value);

                    if ( didThrow || value.done ) {

                        listener.complete();

                    }

                },
                complete () {

                    listener.complete();

                },
                error ( error ) {

                    let didThrow = false;
                    let value;
                    try {

                        value = iterator.error(error);

                    } catch ( e ) {

                        didThrow = true;
                        listener.error(e);

                    }

                    if ( didThrow || value.done ) {

                        listener.complete();

                    }
                    listener.next(value);

                }
            };

            this.unsub = () => stream$.removeListener(_listener);
            stream$.addListener(_listener);

        },
        stop () {

            this.unsub();
            this.iterator = null;

        },
        iterator: null
    });

};


export const continueWith = other$ => stream$ => concat(stream$, other$);

