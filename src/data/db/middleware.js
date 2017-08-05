import xs from "xstream";
import { createStreamMiddleware } from "data/streamMiddleware";
import { db } from "data/db";
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
    DELETE_DOC
} from "./actions";
import {
    // toJS,
    // Map,
    List,
    fromJS
} from "immutable";
import { unwrapMap } from "components/immutable";
import constant from "lodash/constant";
import { withType } from "data/commons";



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
    .map(xs.fromPromise)
    .flatten()
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
    .map(xs.fromPromise)
    .flatten();

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

    return xs
        .merge(
            insert$,
            find$,
            delete$
        )
        // .debug();

};


export const dbMiddleware = createStreamMiddleware(
    creator,
    "db"
);
