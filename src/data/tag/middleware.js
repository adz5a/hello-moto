import { 
    db,
    loadType,
    createIndex
} from "data/db";
import {
    LOAD_TAGS
} from "./actions";

import { MiddlewareFactory } from "data/middlewareFactory";


export const effects = {




};


export const loadTags = loadType("tag");

export const init = {

    onStart ( dispatch ) {

        // console.log("yolo");
        loadTags(db)
            .then(
                tags => {

                    return dispatch({
                        type: LOAD_TAGS,
                        data: tags
                    });

                }
            );        

    }

};


export const middleware = MiddlewareFactory(effects, init);
