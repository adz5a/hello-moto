import PouchDB from "pouchdb";
import findPlugin from "pouchdb-find";

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

export const db = new PouchDB(__name__);
