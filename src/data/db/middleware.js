import { MiddlewareFactory } from "data/middlewareFactory";
import { db } from "data/db";
import {
    // loadType,
    createIndex
} from "./data";
import {
    INSERT_DOC,
    FIND_DOC
} from "./actions";
import {
    // toJS,
    Map
} from "immutable";
import constant from "lodash/constant";

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

const effects = {

    [INSERT_DOC]: doc => {

        const rawDoc = unwrapMap(doc);


        return db
            .put(rawDoc)
            .then(
                constant(doc),
                err => {

                    console.error(err);
                    throw err;

                }
            );

    },

    [FIND_DOC]: ({ query }) => {

        console.log("yay");
        const raw = unwrapMap(query);

        console.log(raw);

        db
            .find(query)
            .then(console.log, console.error)
        return { query };

    }

};


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


export const middleware = MiddlewareFactory(effects, init);
