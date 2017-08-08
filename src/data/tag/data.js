import { ACTIONFACTORY } from "data/commons";


const prefixer = ACTIONFACTORY("__tag__");


export const makeId = tagName => prefixer(tagName);
