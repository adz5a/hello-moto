import fromDiagram from "xstream/extra/fromDiagram";
import {
    takeUntil,
    withGenerator
} from "components/stream";
import noop from "lodash/noop";
import xs from "xstream";

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


const defer = () => {

    const deferred = {};

    const promise = new Promise (( resolve, reject ) => {

        deferred.resolve = resolve;
        deferred.reject = reject;

    });

    deferred.promise = promise;

    return deferred;

};


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

});
