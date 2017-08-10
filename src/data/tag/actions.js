import { ACTIONFACTORY } from "data/commons";


const ACTION = ACTIONFACTORY("tag");

export const TAG_DOC = ACTION("tag-doc");
export const TAG_DOC_ADDED = ACTION("tag-doc-added");

export const TOGGLE_DOC_TAG = ACTION("toggle-tag-doc");
export const DOC_TAG_TOGGLED = ACTION("toggled-tag-doc");

export const UPDATE_TAG_LIST = ACTION("update-tag-list");
