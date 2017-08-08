import xs from "xstream";
import { createStreamMiddleware } from "data/streamMiddleware";
import { db } from "data/db";
import {
    // loadType,
    // createIndex
} from "./data";
import {
    INSERT_DOC,
    FIND_DOC,
    INSERTED_DOC,
    FOUND_DOC,
    DELETED_DOC,
    DELETE_DOC,
    ADD_BULK,
    ADD_BULK_RESPONSE,
    UPDATE_DOC,
    DOC_UPDATED
} from "./actions";
import {
    // toJS,
    // Map,
    List,
    Map,
    fromJS
} from "immutable";
import { unwrapMap } from "components/immutable";
import constant from "lodash/constant";
import { withType } from "data/commons";
import { awaitPromises } from "components/stream";



// const destroy = db => db.destroy();






const insert = insert$ => insert$
        .map( ( { data: doc } ) => {

            const raw = unwrapMap(doc);

            return db
                .put(raw)
                .then(constant(doc));

        })
        .map(xs.fromPromise)
        .flatten()
        // .debug()
        .map(doc => {

            return {
                type: INSERTED_DOC,
                data: doc
            };

        });


const find = find$ => find$
    .map( ({ data }) => {


        const { query } = data;
        const raw = unwrapMap(query);


        return db
            .find(raw)
            .then(
                ( { docs = [] } ) => {

                    return {
                        query,
                        response: List(docs.map( doc => fromJS(doc) ))
                    };

                }
            );

    })
    .compose(awaitPromises())
    // .debug()
    .map( data => {

        return {
            type: FOUND_DOC,
            data
        };

    });


const delete_ = delete$ => delete$
    .map( action => {

        const data = unwrapMap(action.data);

        const { _id } = data;

        return db.get(_id)
            .then(doc => db.remove(doc))
            .then( res => {

                if ( res.ok ) {


                    return {
                        type: DELETED_DOC,
                        data: { _id: res.id }
                    };


                } else throw res;

            });

    })
    .compose(awaitPromises());


const addBulk = action$ => action$
    .filter(withType(ADD_BULK))
    .map( action => {

        const { data } = action.data;

        const docs = data.toJS();
        // console.log(docs);
        return db
            .bulkDocs(docs)
            .then( response => {

                return {
                    type: ADD_BULK_RESPONSE,
                    data: {
                        data,
                        response: List(response.map(Map))
                    }
                };

            }, err => {

                console.error(err);

                return {
                    type: ADD_BULK_RESPONSE,
                    data: {
                        data,
                        response: err,
                        error: true
                    }
                };

            } );

    } )
    .compose(awaitPromises());


const update = action$ => {

    return action$
        .filter(withType(UPDATE_DOC))
        .map(action => {

            const { doc } = action.data;

            return db.put(doc)
                .then( response => {

                    return { doc, response };

                })
                .then(data => {

                    return {
                        type: DOC_UPDATED,
                        data
                    };

                });

        })

};

const creator = action$ => {


    const insert$ = action$
        .filter(withType(INSERT_DOC))
        .compose(insert);

    const find$ = action$
        .filter(withType(FIND_DOC))
        .compose(find);

    const delete$ = action$
        .filter(withType(DELETE_DOC))
        .compose(delete_);

    const addBulk$ = action$
        .compose(addBulk);

    return xs
        .merge(
            insert$,
            find$,
            delete$,
            addBulk$
        )
        // .debug();

};


export const middleware = createStreamMiddleware(
    creator,
    "db"
);
