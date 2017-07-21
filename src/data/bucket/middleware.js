import {
    // LIST_DIRS,
    // LIST_CONTENT,
    // SAVE,
    // SAVE_BUCKET,
    // SAVE_ALL
    ADD_BUCKET,
    LIST_CONTENT,
    DELETE,
    DELETE_ALL
} from "./actions";
import {
    makeId,
    makeURL,
} from "./data";
import {
    // listPrefixes,
    // foldPrefixes,
    listBucket
} from "data/xml.utils";
import {
    fromURL
} from "data/link";
import { MiddlewareFactory } from "data/middlewareFactory";
// import keys from "lodash/keys";
import PouchDB from "pouchdb";
import findPlugin from "pouchdb-find";


PouchDB.plugin(findPlugin);



const db = new PouchDB("__db__");

db.createIndex({
    index: {
        fields: [ "type" ]
    }
})
    .then(console.log);

export function loadBuckets ( db ) {

    return db
        .find({
            selector: {
                type: "bucket"
            },
        })
        .then( ( { docs = [] } ) => {

            return docs.map( doc => doc.bucket );

        });

}

const effects = {
    [ADD_BUCKET]: bucket => {

        const id = makeId(bucket);

        return db.get(id)
            .then( 
                doc => db.put({
                    ...doc,
                    type: "bucket",
                    bucket
                }), 
                () => db.put({
                    _id: id,
                    type: "bucket",
                    bucket
                }) 
            )
            .then( () => bucket );
    },
    [LIST_CONTENT]: bucket => {

        return listBucket(bucket)
            .then(( { contents } ) => {

                const url = makeURL(bucket);
                return {
                    links: contents.map( item => fromURL(url + "/" + item.Key)),
                    bucket
                }

            })
            .catch( error => {
                console.error(error);
                return error;
            })


    },


    [DELETE]: bucket => {

        return db.find({
            selector: {
                type: "bucket",
                _id: makeId(bucket)
            }
        })
            .then( docs => {

                console.log(docs);

            }, console.error )
            .then( () => bucket );

    },


    [DELETE_ALL]: () => {

        return db
            .find({
                selector: {
                    type: "bucket"
                }
            })
            .then( ({ docs }) => {

                return db.bulkDocs(
                    docs.map( doc => ({...doc, _deleted: true }) )
                );


            } );

    }
};

const init = {
    onStart( dispatch ) {

        loadBuckets(db)
            .then( buckets => buckets.forEach( bucket => {

                dispatch({
                    type: ADD_BUCKET,
                    data: bucket
                });

            }))
            .catch(console.error);
        ;

    }
};

export const middleware = MiddlewareFactory(effects, init);
