import {

} from "./actions";
import {

} from "./data";
import {

} from "data/xml.utils";
import {
    // fromURL
} from "data/link";
import { MiddlewareFactory } from "data/middlewareFactory";
import {
    FIND_DOC
} from "data/db";




// const db = new PouchDB("__db__");





// const loadBuckets = loadType("bucket");

const effects = {};


const init = {
    onStart( dispatch ) {


        dispatch({
            type: FIND_DOC,
            data: {
                query: {
                    selector: {
                        type: "bucket"
                    }
                }
            }
        });


    }
};

export const middleware = MiddlewareFactory(effects, init);
