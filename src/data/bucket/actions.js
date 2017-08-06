import {
    ACTIONFACTORY
} from "data/commons";

export const ACTION = ACTIONFACTORY("bucket");

export const LIST_DIRS = ACTION("list-dirs");
export const LIST_CONTENT = ACTION("list-content");
export const LIST_CONTENT_RESPONSE = ACTION("list-content-response");
export const LIST_NEXT_CONTENT = ACTION("list-next-content");
