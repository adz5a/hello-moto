import { ACTIONFACTORY } from "data/commons";
import {
    // Seq,
    // List,
    // Repeat,
    Record
} from "immutable";





const prefixer = ACTIONFACTORY("__tag__");


export const Tag = Record({});

export const makeId = tagName => prefixer(tagName);
