import {
    // LIST_DIRS,
    // LIST_CONTENT,
    // SAVE,
    // SAVE_BUCKET,
    // SAVE_ALL
    ADD_BUCKET,
    LIST_CONTENT,
    DELETE,
    DELETE_ALL,
    LIST_NEXT_CONTENT,
    SAVE_ALL 
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
import get from "lodash/fp/get";
import map from "lodash/map";
import { 
    db,
    loadType,
    createIndex
} from "data/db";




// const db = new PouchDB("__db__");

const createTypeIndex = createIndex(db, [ "type" ])
    .then(status => console.info("db type index status : ", status));




const loadBuckets = loadType("bucket");
const loadLinks = loadType("link");

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
            .then(( { contents, ...status } ) => {

                const url = makeURL(bucket);
                return {
                    links: contents.map( item => fromURL(url + "/" + item.Key)),
                    bucket,
                    status
                }

            })
            .catch( error => {
                console.error(error);
                return error;
            })


    },


    [LIST_NEXT_CONTENT]: bucket => {

        const token = get("status.nextContinuationToken");
        const { links } = bucket;

        console.log(links);
        if ( token(links) === null ) {

            return Promise.reject(new Error("need continuation token"));

        } else {

            return listBucket(bucket, {
                continuationToken: token(links)
            })
                .then(( { contents, ...status } ) => {

                    const url = makeURL(bucket);
                    return {
                        links: contents.map( item => fromURL(url + "/" + item.Key)),
                        bucket,
                        status
                    }

                })
                .catch( error => {
                    console.error(error);
                    throw error;
                });

        }


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

    },


    [SAVE_ALL]: ( bucket ) => {

        const { links } = bucket;

        // console.log(links);


        return db
            .bulkDocs(map( 
                links.links,
                link => ({
                    _id: link.id,
                    type: "link",
                    link
                })
            ))
            .then( res => {

                console.log(res);
                return res;

            });

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

        loadLinks(db)
            .then(console.log);

    }
};

export const middleware = MiddlewareFactory(effects, init);
