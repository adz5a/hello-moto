import xs from "xstream";
import { MiddlewareFactory } from "data/middlewareFactory";
import { createStreamMiddleware } from "data/streamMiddleware";
import { db } from "data/db";
import {
    // loadType,
    createIndex
} from "./data";
import {
    INSERT_DOC,
    FIND_DOC,
    INSERTED_DOC,
    FOUND_DOC
} from "./actions";
import {
    // toJS,
    Map,
    List,
    fromJS
} from "immutable";
import constant from "lodash/constant";
import omit from "lodash/fp/omit";


const omitRev = omit(["_rev"]);
const deleteById = id => db
    .find({
        selector: {
            _id: id
        }
    })
    .then( res => {

        const docs = res.docs;
        if ( docs.length > 0 ) {

            return db.bulkDocs(docs.map( doc => ({
                ...doc,
                _deleted: true
            })));

        } else {

            throw new Error("this doc does not exist");

        }

    });


const destroy = db => db.destroy();

const unwrapMap = data => {

    if ( Map.isMap(data) ) {

        return data.toJS();

    } else {

        return data;

    }

}



const init = {
    onStart () {

        if ( process.env.NODE_ENV !== "production" ) {

            global.deleteById = deleteById;

            global.destroyDB = destroy;

        }

        createIndex(db, [ "type" ])
            .then(status => console.info("db type index status : ", status));
    }
};

const withType = type => action => action.type === type;


const insert = insert$ => insert$
        .map( ( { data: doc } ) => {

            const raw = unwrapMap(doc);

            return db
                .put(raw)
                .then(constant(doc));

        })
        .map(xs.fromPromise)
        .flatten()
        .debug()
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
                        response: List(docs.map( doc => fromJS(omitRev(doc)) ))
                    };

                }
            );

    })
    .map(xs.fromPromise)
    .flatten()
    .debug()
    .map( data => {

        return {
            type: FOUND_DOC,
            data
        };

    })

const creator = action$ => {

    const insert$ = insert(action$.filter(withType(INSERT_DOC)));
    const find$ = find(action$.filter(withType(FIND_DOC)));

    return xs
        .merge(
            insert$,
            find$
        )
        .debug();
};


export const dbMiddleware = createStreamMiddleware(
    creator,
    "db"
);
