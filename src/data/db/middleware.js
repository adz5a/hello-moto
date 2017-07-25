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

        
        const raw = unwrapMap(query);

        console.log(raw);

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
