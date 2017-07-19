import {
    // LIST_DIRS,
    // LIST_CONTENT,
    // SAVE,
    // SAVE_BUCKET,
    // SAVE_ALL
    ADD_BUCKET,
    makeId,
    makeURL,
    LIST_CONTENT,
    contentType
} from "data/bucket";
import {
    // listPrefixes,
    // foldPrefixes,
    listBucket
} from "data/xml.utils";
import { MiddlewareFactory } from "data/middlewareFactory";
import keys from "lodash/keys";
import PouchDB from "pouchdb";


PouchDB.plugin(require("pouchdb-find").default);



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
                return contents.map( item => ({
                    url: `${url}${item.Key}`,
                    contentType: contentType(item.Key),
                    bucket
                }))

            })


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
