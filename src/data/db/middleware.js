import { MiddlewareFactory } from "data/middlewareFactory";
import { db } from "data/db";


const effects = {};


const init = {
    onStart () {

        if ( process.env.NODE_ENV !== "production" ) {

            global.deleteById = id => db
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


            global.destroyDB = () => db.destroy();

        }

    }
};


export const middleware = MiddlewareFactory(effects, init);
