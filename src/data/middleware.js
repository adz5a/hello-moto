import map from "lodash/fp/map";
import reduce from "lodash/fp/reduce";
import {
    PROCESSING,
    isSafe
} from "data/commons";
import {
    LOAD
} from "./reducer";
import conforms from "lodash/fp/conforms";
import isString from "lodash/isString";





export function middleware ( store ) {

    return next => action => {

        const { type } = action;

        switch ( type ) {

            case LOAD:
                if ( isSafe(action) ) {

                    loadData()
                        .then(
                            data => store.dispatch({
                                type,
                                data,
                                meta: meta()
                            })
                        );
                    return next({
                        type: PROCESSING,
                        data: action,
                        meta: meta()
                    });

                } else {

                    return next(action);

                }

            default:
                return next(action);

        }

    };

}
