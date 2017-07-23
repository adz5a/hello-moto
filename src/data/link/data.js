import defaults from "lodash/fp/defaults";
import flow from "lodash/flow";

export const makeIdFromURL = flow([
    encodeURIComponent,
    btoa
]);


export const makeId = ( link ) => {

    const tl = typeof link;
    if ( tl === "object" && link !== null ) {

        if ( link.id ) {

            return link.id;

        } else {

            return makeIdFromURL(link.url);

        }
        
    } else if ( tl === "string" ) {

        return makeIdFromURL(tl);

    } else {

        return null;

    }

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
