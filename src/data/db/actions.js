import { ACTIONFACTORY } from "data/commons";


const ACTION = ACTIONFACTORY("__db__");


// export const FETCH_DOC_BY_ID = ACTION("fetch-by-id");
// export const FETCHED_DOC_BY_ID = ACTION("fetched-by-id");

export const FIND_DOC = ACTION("find-doc"); // uses db.find
export const FOUND_DOC = ACTION("found-doc"); // uses db.find

// uses db.put
// should error if docs with same id already exists
export const INSERT_DOC = ACTION("insert-doc"); 
export const INSERTED_DOC = ACTION("inserted-doc"); 

export const UPDATE_DOC = ACTION("update-doc"); //
export const DOC_UPDATED = ACTION("doc-updated"); //

export const DELETE_DOC = ACTION("delete-doc");
export const DELETED_DOC = ACTION("deleted-doc");

export const ADD_BULK = ACTION("add_bulk");
export const ADD_BULK_RESPONSE = ACTION("add-bulk-response");


export const QUERY = ACTION("query");
export const QUERY_DONE = ACTION("query-done");

export const REGISTER_TYPE = ACTION("register-type");
export const TYPE_REGISTERED = ACTION("type-registered");
