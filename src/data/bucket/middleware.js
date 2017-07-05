import {
    LIST_DIRS,
    LIST_CONTENT,
    SAVE
} from "data/bucket";
import  {
    listPrefixes,
        foldPrefixes,
        listBucket
} from "data/xml.utils";
import {
    isSafe,
    PROCESSING,
    fromMiddleware
} from "data/commons";

export function middleware ( store ) {

    return next => action => {

        const { type, data, meta } = action;

        switch ( type ) {


            case LIST_DIRS:
                if ( isSafe(action) ) {

                    listPrefixes(data)
                        .then( prefixSet => {

                            return {

                                ...data,
                                prefixes: foldPrefixes([ ...prefixSet ])

                            };

                        })
                        .then(data => store.dispatch({
                            type,
                            data,
                            meta: fromMiddleware()
                        }))
                        .catch(console.error);

                    return next({
                        type: PROCESSING,
                        data: action,
                        meta: fromMiddleware()
                    });

                }

            case LIST_CONTENT:
                if ( isSafe(action) ) {


                    listBucket(data)
                        .then( contents => ({
                            type,
                            data: {
                                ...data,
                                contents
                            },
                            meta: fromMiddleware()
                        }))
                        .then(store.dispatch);


                    return next({
                        type: PROCESSING,
                        data: action,
                        meta: fromMiddleware()
                    });

                }


            default:
                return next(action);

        }

    }

}
