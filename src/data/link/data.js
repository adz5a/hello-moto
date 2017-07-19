import flow from "lodash/flow";
import defaults from "lodash/fp/defaults";

export const makeId = link => link.url;
export const link = flow([
    defaults({ 
        url: null, // should not be null
        contentType: null, // can be null
    }),
]);

export const contentTypeFromURL = url => {

    if ( typeof url !== "string" ) {

        return null;

    }

    const extension = url.split(".");

    switch ( extension[extension.length - 1]) {

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

export const fromURL = url => ({
    url,
    contentType: contentTypeFromURL(url)
})
