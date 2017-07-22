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



export function createStore ( {
    middlewares = []
} = {}) {

    let composeEnhancers = compose;


    const reducer = combineReducers({
        buckets,
        links
    });

    if ( process.env.NODE_ENV !== "production" ) {


        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


    }

    return  createReduxStore(reducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(...[
            linkMiddleware,
            bucketMiddleware,
            ...middlewares
        ])
    ));
}
