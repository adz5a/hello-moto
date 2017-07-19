import {
    ACTIONFACTORY
} from "data/commons";

export const ACTION = ACTIONFACTORY("bucket");

export const LIST_DIRS = ACTION("list-dirs");
export const LIST_CONTENT = ACTION("list-content");
export const SAVE = ACTION("save");
export const SAVE_ALL = ACTION("save-all");
export const ADD_BUCKET = ACTION("add-bucket");
export const SAVE_BUCKET = ACTION("save-bucket");
