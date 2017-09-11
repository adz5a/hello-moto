declare function require( a: string ): any;
const PouchDB: any = require("pouchdb").default;
const findPlugin: any = require("pouchdb-find");

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

export interface DB {
    find: ( s: any ) => Promise<any>;
    createIndex: ( s: any ) => Promise<any>;
}

export interface Doc {
    _id: string;
    _rev: string;
}



export const createIndex = ( db: DB, fields: string[] = []) => db
    .createIndex({
        index: {
            fields
        }
    });

export const db: DB = new PouchDB(__name__);
