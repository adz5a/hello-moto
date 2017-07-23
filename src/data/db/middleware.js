import { MiddlewareFactory } from "data/middlewareFactory";
import { db } from "data/db";


const effects = {};


const init = {
    onStart () {

        window.deleteById = id => db
            .find({
                selector: {
                    _id: id
                }
            })
            .then( res => {

                const docs = res.docs;
                if ( docs.length > 0 ) {

                    return db.bulkDocs(docs.map( doc => ({
                        ...doc,
                        _deleted: true
                    })));

                } else {

                    throw new Error("this doc does not exist");

                }

            });

    }
};


export const middleware = MiddlewareFactory(effects, init);
