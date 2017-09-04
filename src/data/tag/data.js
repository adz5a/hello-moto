import { ACTIONFACTORY } from "data/commons";
import {
    // Seq,
    // List,
    // Repeat,
    Set
} from "immutable";





const prefixer = ACTIONFACTORY("__tag__");


export const Tag = Set

export const makeId = tagName => prefixer(tagName);
