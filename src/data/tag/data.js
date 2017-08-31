import { ACTIONFACTORY } from "data/commons";
import {
    // Seq,
    // List,
    // Repeat,
    Map
} from "immutable";





const prefixer = ACTIONFACTORY("__tag__");


export const Tag = Map

export const makeId = tagName => prefixer(tagName);
