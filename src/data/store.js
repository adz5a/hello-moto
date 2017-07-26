import {
    createStore as createReduxStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import {
    reducer as buckets,
    middleware as bucketMiddleware
} from "data/bucket";
import {
    reducer as links,
    middleware as linkMiddleware
} from "data/link";
import {
    reducer as tags,
    middleware as tagMiddleware
} from "data/tag";
import {
    // middleware as dbMiddleware,
    reducer as db,
    dbMiddleware
} from "data/db";



export function createStore ( {
    middlewares = []
} = {}) {

    let composeEnhancers = compose;


    const reducer = combineReducers({
        buckets,
        tags,
        links,
        db
    });

    if ( process.env.NODE_ENV !== "production" ) {


        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


    }

    return  createReduxStore(reducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(...[
            // linkMiddleware,
            dbMiddleware,
            bucketMiddleware,
            // tagMiddleware,
            ...middlewares
        ])
    ));
}
