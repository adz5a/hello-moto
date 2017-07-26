import { createEventHandler } from "components/recompose";
import xs from "xstream";


export function createStreamMiddleware ( creator ) {

    return function middleware ( store ) {

        const { stream, handler: onNext } = createEventHandler();
        const action$ = creator(xs.fromObservable(stream));


        action$
            .addListener({
                next: store.dispatch,
                error ( error ) {

                    console.error("terminal error in middleware", error);

                },
                complete () {

                    console.info("this middleware just terminated");

                }
            });

        return next => action => {

            const returnValue = next(action);


            // this is the actual side effect
            // it is implemented with recompose 
            // createEventHandler but other implementation
            // with Subjects ( Rx ) or Stream.imitate 
            // ( xstream ) are valid too and probably more
            // "correct"
            onNext(action);
            return returnValue;

        };

    };

}

/*
 * Example :
 * see db middleware
 *
 */
