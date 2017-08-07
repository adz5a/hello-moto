import PouchDB from "pouchdb";
import findPlugin from "pouchdb-find";
import map from "lodash/map";

PouchDB.plugin(findPlugin);

let __name__ = process.env.REACT_APP_POUCHDB;
const defaultName = "__db__";
const message = `
the REACT_APP_POUCHDB env var was not set,
local db will be called ${defaultName}
`

if ( !__name__ ) {

    console.warn(
        message.trim()
    );

    __name__ = defaultName;

}

export const loadType = type => db => db
    .find({
        selector: {
            type
        }
    })
    .then( ({ docs = [], ...rest }) => {

        // console.log(type, docs, rest);
        return map( docs, doc => doc[type] );

    } );


export const createIndex = (db, fields = []) => db
    .createIndex({
        index: {
            fields
        }
    });

export const db = new PouchDB(__name__);


if ( process.env.NODE_ENV !== "production" ) {

    global.__db = db;

}
