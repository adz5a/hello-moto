import isFunction from "lodash/isFunction";
import {
    ACTIONFACTORY,
    fromMiddleware
} from "data/commons";

const MIDDLEWARE = ACTIONFACTORY("__middleware__");
const PROCESSING = MIDDLEWARE("processing");
const ERROR = MIDDLEWARE("error");



export const tryCatch = (effect, wrapper) => {

    let val
    try {
        val = effect();
    } catch ( e ) {

        wrapper.value = e;
        return wrapper;

    };
    return val;

};

export const process = store => ( type, meta ) => promise => promise
    .then(data => ({
        type,
        meta,
        data
    }))
    .catch( error => ({
        type: ERROR,
        data: {
            type,
            data: error
        },
        meta
    }));

export function MiddlewareFactory ( effectsMap, id = Math.random().toString() ) {

    if ( typeof effectsMap !== "object" || effectsMap === null ) {

        throw new TypeError("Expects an object :: { key: function }");

    }

    const invalidKeys = Object.keys(effectsMap)
        .filter(key => !isFunction(effectsMap[key]));

    if ( invalidKeys.length > 0 ) {

        throw new TypeError("All keys must be functions, instead received non functions for : " + invalidKeys.join(" "));

    }


    const effects = new Map(
        Object.keys(effectsMap).map( key => [ key, effectsMap[key] ])
    );

    const isFromHere = action => action.meta && action.meta.from === id;
    const fromHere = () => ({
        from: id
    });

    const errorWrapper = {};
    return function middleware ( store ) {

        return next => action => {

            const { type, meta = {}, data } = action;
            if ( !isFromHere(action) && effects.has(type) ) {

                const value = tryCatch(
                    () => effects.get(type)(data),
                    errorWrapper
                );

                const promise = value === errorWrapper ? 
                    Promise.reject(value.value) :
                    Promise.resolve(value)

                promise
                    .then(data => ({
                        type,
                        meta: fromMiddleware({
                            ...meta,
                            ...fromHere()
                        }),
                        data
                    }))
                    .catch( error => ({
                        type: ERROR,
                        data: {
                            type,
                            data: error
                        },
                        meta: fromMiddleware({
                            ...meta,
                            ...fromHere()
                        }),
                    }))
                    .then(store.dispatch);

                    return next({
                        type: PROCESSING,
                        data: action,
                        meta: fromMiddleware({
                            promise,
                            ...fromHere()
                        })
                    });

            } else {

                return next(action);

            }

        };

    }

}
