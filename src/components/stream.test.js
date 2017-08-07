import fromDiagram from "xstream/extra/fromDiagram";
import {
    takeUntil,
    withGenerator,
    awaitPromises,
    continueWith
} from "components/stream";
import noop from "lodash/noop";
import xs from "xstream";
import { defer, after } from "components/promise";


const K = v => () => v;


const reduce = ( reduceFn, startWith, input$ ) => {


    return new Promise(( resole, reject ) => {


        let value;


        const listener = {
            next ( event ) {},
            error ( e ) {

                reject(e);

            },
            complete () {}
        };




    });


}




describe("takeUntil", () => {

    test("basic test", () => {


        const complete = defer();


        const input$ = fromDiagram("-a--b--c|");

        const stop$ = fromDiagram("-----d|");

        const next = jest.fn(value => {

            expect(value).toEqual(["a", "b"]);

        });

        const error = jest.fn();

        const result$ = input$
            .endWhen(stop$)
            .fold(( list, next ) => {

                list.push(next);
                return list;

            }, [])
            .last()
            .addListener({
                next,
                error: ( err ) => {

                    error();
                    complete.reject(err);

                },
                complete: () => {

                    expect(next)
                        .toHaveBeenCalledTimes(1);

                    expect(error)
                        .toHaveBeenCalledTimes(0);

                    complete.resolve();

                }
            });


        return complete.promise;



    });

});


describe("withGenerator", () => {

    test("add", () => {

        const done = defer();


        xs.periodic(10)
            .take(5)
            .compose(withGenerator(function * (start = 0) {

                let value = start;
                while ( true ) {

                    value = value + 1;
                    value = yield value;

                }

            }))
            .last()
            .addListener({

                next ( value ) {

                    // console.log("value", value);
                    expect(value).toBe(5);

                },

                error ( err ) {

                    done.reject(err);

                },

                complete () {

                    done.resolve();

                }
            });



        return done.promise;

    });


    test("until", () => {

        const done = defer();

        xs.periodic(3)
            .take(5)
            .compose(withGenerator(function * () {

                yield 1;
                yield 1;
                return 3;

            }))
            .last()
            .addListener({

                next( value ) {

                    expect(value).toBe(3);

                },

                error ( err ) {

                    done.reject(err);

                },

                complete () {

                    done.resolve();

                }

            })

        return done.promise;

    });
});


describe("awaitPromises/concurrently", () => {


    test("basic", () => {

        const done = defer();
        const in$ = xs
            .of(
                after(10).then(K(1)),
                after(15).then(K(2)),
                after(17).then(K(3))
            )
            .compose(awaitPromises())
            .fold((list, value) => [...list, value], [])
            .last()
            .addListener({

                next ( value ) {

                    expect(value).toEqual([1, 2, 3]);

                },
                complete () {

                    done.resolve();

                }

            });


        return done.promise;

    });


    test("without no order", () => {

        /*
         * In this example, promises are not
         * resolved in the same order they are
         * received.
         * They are received synchronously but the
         * 2nd is resolved first.
         * Because it is concurrent, the returned
         * values are in the order of the resolution.
         *
         */
        const done = defer();
        const in$ = xs
            .of(
                after(10).then(K(1)),
                after(5).then(K(2)),
            )
            .compose(awaitPromises())
            .fold((list, value) => [...list, value], [])
            .last()
            .addListener({

                next ( value ) {

                    expect(value).toEqual([2, 1]);

                },
                complete () {

                    done.resolve();

                }

            });


        return done.promise;


    });
});


describe("awaitPromises/sequentially", () => {


    test("basic test", () => {

        const done = defer();
        const in$ = xs
            .of(
                after(17).then(K(3)),
                after(10).then(K(1)),
                after(15).then(K(2))
            )
            .compose(awaitPromises(false))
            .fold((list, value) => [...list, value], [])
            .last()
            .addListener({

                next ( value ) {

                    expect(value).toEqual([3, 1, 2]);

                },
                complete () {

                    done.resolve();

                }

            });


        return done.promise;

    });


});


describe("continueWith", () => {

    test("basic", () => {
        const input$ = fromDiagram("--a--b-|");
        const next$ = fromDiagram("-c--d-|");


        const done = defer();


        input$
            .compose(continueWith(next$))
            .fold(( list, value ) => [ ...list, value ], [])
            .last()
            .addListener({

                next ( value ) {

                    expect(value).toEqual("abcd".split(""));

                },

                complete () {

                    done.resolve();

                }

            });


        return done.promise;
    });

});
