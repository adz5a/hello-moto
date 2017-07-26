export const contentType = ({ url }) => {

    const ext = url.split(".").pop();
    switch ( ext ) {

        case "png":
        case "jpg":
            return "image";


        // case "png":
        case "mp4":
            return "video";


        case "mp3":
            return "music";


        default:
            return null

    }

}
