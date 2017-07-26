import defaults from "lodash/fp/defaults";
import flow from "lodash/flow";
import omitBy from "lodash/fp/omitBy";
import { 
    Map,
    fromJS
} from "immutable";

export const makeIdFromURL = flow([
    encodeURIComponent,
    btoa
]);


export const makeId = ( { url } ) => {

    return makeIdFromURL(url);

}


export const link = flow([
    defaults({ 
        url: null, // should not be null
        contentType: null, // can be null
        id: null
    }),
]);

export const contentTypeFromURL = url => {

    if ( typeof url !== "string" ) {

        return null;

    }

    const extension = url.split(".");

    switch ( extension[extension.length - 1] ) {

        case "jpg":
        case "png":
            return "image";
            
        case "mp3":
            return "music";

        case "mp4":
            return "video";

        default:
            return null;

    }
};


export const isImage = link => link.contentType === "image";
export const isVideo = link => link.contentType === "video";
export const isMusic = link => link.contentType === "music";

export const fromURL = url => ({
    url,
    contentType: contentTypeFromURL(url),
    id: makeId( { url } )
})


export const fromObject = flow([
    omitBy( value => typeof value !== "string" || value.length === 0 ),
    defaults({
        url: null,
        name: null,
    }),
    link => fromJS({
        ...link,
        id: makeId(link),
        contentType: contentTypeFromURL(link.url)
    })
]);
