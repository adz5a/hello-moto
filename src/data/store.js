import {
    createStore as createReduxStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import {
    reducer as db,
    middleware as dbMiddleware
} from "data/db";
// import {
//     // middleware as imageMiddleware
// } from "data/image";
import {
    middleware as tagMiddleware,
} from "data/tag";


export function createStore ( {
    middlewares = []
} = {}) {

    let composeEnhancers = compose;


    const reducer = combineReducers({
        db,
    });

    if ( process.env.NODE_ENV !== "production" ) {


        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


    }

    return  createReduxStore(reducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(...[
            // linkMiddleware,
            dbMiddleware,
            tagMiddleware,
            ...middlewares
        ])
    ));
}
