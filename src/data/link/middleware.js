import { MiddlewareFactory } from "data/middlewareFactory";
import { 
    db,
    loadType,
} from "data/db";
import {
    LOAD_LINKS
} from "./actions";

const loadLinks = loadType("link");



const init = {

    onStart ( dispatch ) {

        loadLinks(db)
            .then(
                links => dispatch({
                    type: LOAD_LINKS,
                    data: links
                })
            );

    }

};


const handlers = {};


export const middleware = MiddlewareFactory(handlers, init);
