import { ACTIONFACTORY } from "data/commons";


const ACTION = ACTIONFACTORY("__db__");


export const FETCH_DOC_BY_ID = ACTION("fetch-by-id");
export const FETCHED_DOC_BY_ID = ACTION("fetched-by-id");

export const FIND_DOC = ACTION("find-doc"); // uses db.find
export const FOUND_DOC = ACTION("found-doc"); // uses db.find

// uses db.put
// should error if docs with same id already exists
export const INSERT_DOC = ACTION("insert-doc"); 
export const INSERTED_DOC = ACTION("inserted-doc"); 

export const UPDATE_DOC = ACTION("update-doc"); //

export const DELETE_DOC = ACTION("delete-doc");
export const DELETED_DOC = ACTION("deleted-doc");

export const ADD_BULK = ACTION("add_bulk");
