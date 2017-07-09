import {
    LIST_DIRS,
    LIST_CONTENT,
    SAVE,
    SAVE_ALL
} from "data/bucket";
import  {
    listPrefixes,
        foldPrefixes,
        listBucket
} from "data/xml.utils";
import {
    isSafe,
    PROCESSING,
    fromMiddleware
} from "data/commons";
import PouchDB from "pouchdb";
import reduce from "lodash/fp/reduce";
import forEach from "lodash/forEach";
import keys from "lodash/fp/keys";
import map from "lodash/fp/map";

const isMusic = str => str.match(/\.mp3/) !== null;
const isVideo = str => str.match(/\.mp4|avi/) !== null;
const isImg = str => str.match(/\.jpg|png/) !== null;

const byType = reduce(( dbs, item ) => {

    if ( isMusic(item.Key) ) {

        dbs.music.push(item);

    } else if ( isVideo(item.Key) ){


        dbs.videos.push(item);

    } else if ( isImg(item) ) {

        dbs.imgs.push(item);

    }


    return dbs;

});

const normalizeItems = map( item => ({
    _id: item.Key,
    item
}));

function saveBucketContent ( dbInstances, bucket ) {

    if ( !bucket.contents ) {

        return Promise.reject("Bucket content not loaded");

    } else {


        const dbs = byType({
            imgs: [],
            videos: [],
            music: []
        },
            bucket.contents.contents
        );

        const insertions = keys(dbs).map( key => {

            const content = dbs[key];
            return dbInstances[key].bulkDocs(normalizeItems(content));

        });


        return Promise.all(insertions);
    }

}


export function middleware ( store ) {


    const dbs = {
        imgs: new PouchDB("imgs"),
        videos: new PouchDB("videos"),
        music: new PouchDB("music"),
    };


    return next => action => {

        const { type, data, meta } = action;

        switch ( type ) {


            case LIST_DIRS:
                if ( isSafe(action) ) {

                    listPrefixes(data)
                        .then( prefixSet => {

                            return {

                                ...data,
                                prefixes: foldPrefixes([ ...prefixSet ])

                            };

                        })
                        .then(data => store.dispatch({
                            type,
                            data,
                            meta: fromMiddleware()
                        }))
                        .catch(console.error);

                    return next({
                        type: PROCESSING,
                        data: action,
                        meta: fromMiddleware()
                    });

                }

            case LIST_CONTENT:
                if ( isSafe(action) ) {


                    listBucket(data)
                        .then( contents => ({
                            type,
                            data: {
                                ...data,
                                contents
                            },
                            meta: fromMiddleware()
                        }))
                        .then(store.dispatch);


                    return next({
                        type: PROCESSING,
                        data: action,
                        meta: fromMiddleware()
                    });

                }

            case SAVE_ALL:
                if ( isSafe(action) ) {


                    saveBucketContent(dbs, store.getState().bucket)
                        .then(console.log)
                        .catch(console.error);

                    return next({
                        type: PROCESSING,
                        data: action,
                        meta: fromMiddleware()
                    });

                }

            default:
                return next(action);

        }

    }

}
