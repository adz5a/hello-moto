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
    reducer as db,
    middleware as dbMiddleware
} from "data/db";
// import {
//     // middleware as imageMiddleware
// } from "data/image";
import {
    middleware as tagMiddleware,
    reducer as tags
} from "data/tag";
import {
    reducer as gallery,
    // middleware as galleryMiddleware
} from "data/gallery";


export function createStore ( {
    middlewares = []
} = {}) {

    let composeEnhancers = compose;


    const reducer = combineReducers({
        tags,
        db,
        buckets,
        gallery
    });

    if ( process.env.NODE_ENV !== "production" ) {


        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


    }

    return  createReduxStore(reducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(...[
            // linkMiddleware,
            bucketMiddleware,
            dbMiddleware,
            tagMiddleware,
            ...middlewares
        ])
    ));
}
