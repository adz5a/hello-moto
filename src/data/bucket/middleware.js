import {
    // LIST_DIRS,
    // LIST_CONTENT,
    // SAVE,
    // SAVE_BUCKET,
    // SAVE_ALL
    ADD_BUCKET,
    makeId
} from "data/bucket";
import {
    // listPrefixes,
    // foldPrefixes,
    // listBucket
} from "data/xml.utils";
import { MiddlewareFactory } from "data/middlewareFactory";
import keys from "lodash/keys";
import PouchDB from "pouchdb";


PouchDB.plugin(require("pouchdb-find").default);
const db = new PouchDB("__db__");
console.log(PouchDB.prototype);
db.createIndex({
    index: {
        fields: [ "type" ]
    }
})
    .then(console.log);
// db.createIndex({
//     index: {
//         fields: [ "type" ],
//             name: "typeIndex"
//     }
// })
//     .then(console.log);

export const middleware = MiddlewareFactory({
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
    }
}, {
    onStart( dispatch ) {

        db.find({
            selector: {
                type: "bucket"
            },
        })
            .then( ( { docs = [] } ) => {

                console.log(docs);
                docs.forEach( doc => {

                    dispatch({
                        type: ADD_BUCKET,
                        data: doc.bucket
                    });

                })

            }, error => {

                console.error(error);

            });

    }
});
