import { 
    db,
    loadType,
    createIndex
} from "data/db";
import {
    LOAD_TAGS,
    CREATE_TAG,
    DELETE_ALL
} from "./actions";

import { MiddlewareFactory } from "data/middlewareFactory";



const loadTags = loadType("tag");

export const effects = {


    [CREATE_TAG]: tag => {

        return db
            .find({
                selector: {
                    _id: tag.id
                }
            })
            .then( res => {

                if ( res.docs.length === 0 ) {

                    return db
                        .put({
                            _id: tag.id,
                            type: "tag",
                            tag
                        })
                        .then( () => tag );

                } else {

                    throw new Error("Already exists for this id");

                }
            });

    },


    [DELETE_ALL]: tag => {

        return db
            .find({
                selector: {
                    type: "tag"
                }
            })
            .then(({ docs = [] }) => {

                if ( docs.length === 0 ) {

                    return [];

                } else {

                    return db
                        .bulkDocs(docs.map(doc => ({
                            ...doc,
                            _deleted: true
                        })))
                        .then( docs => {

                            const errors = docs
                                .filter(docs => !docs.ok)
                                .map( doc => doc.id );

                            if ( errors.length > 0 ) {

                                return Promise.reject(
                                    {
                                        errors
                                    }
                                );

                            } else return docs.map( doc => doc.id );

                        });

                }

            });

    }
};


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
