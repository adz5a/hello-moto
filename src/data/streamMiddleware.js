import { createEventHandler } from "components/recompose";
import xs from "xstream";
import delay from "xstream/extra/delay";


export function createStreamMiddleware ( creator, name = null ) {

    return function middleware ( store ) {

        const { stream, handler: onNext } = createEventHandler();
        const action$ = creator(xs.fromObservable(stream));


        action$
            .compose(delay(1))
            .addListener({
                next: store.dispatch,
                error ( error ) {

                    console.error("terminal error in middleware", error);

                },
                complete () {

                    if ( name ) {

                        console.info("this middleware just terminated : " + name);

                    }

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
