import {
    ACTIONFACTORY
} from "data/commons";

export const ACTION = ACTIONFACTORY("bucket");

export const LIST_DIRS = ACTION("list-dirs");
export const LIST_CONTENT = ACTION("list-content");
export const LIST_ALL_CONTENT = ACTION("list-all-content");
export const LIST_CONTENT_RESPONSE = ACTION("list-content-response");
export const SAVE_ALL = ACTION("save-all-content");
export const SAVE_ALL_RESPONSE = ACTION("save-all-content-response");
