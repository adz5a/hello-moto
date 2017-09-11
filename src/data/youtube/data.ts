export const baseURL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyDItu4uyFuEaDNn6XF1u7R2eA3DRT_IUk8";


export namespace utils {

    export const encodeParams = ( params: { [k: string]: string | number } ): string =>
        Object.keys(params)
            .reduce(( s: string, key: string ) => {

                return s + key + "=" + params[key] + "&";

            }, "");

}

export interface Channel {
    kind: "youtube#channel";
    channelId: string;
}

export interface Video {
    kind: "youtube#video";
    videoId: string;
}

export type Kinds = Channel | Video;

export namespace search {

    export interface Thumb {
        url: string;
        width: number;
        height: number;
    }

    export interface Snippet {
        channelId: string;
        channelTitle: string;
        description: string;
        liveBroadcastContent: string;
        publishedAt: string;
        thumbnails: {
            default: Thumb;
            medium: Thumb;
            high: Thumb;
        };
        title: string;
    }

    export interface Item <T> {
        etag: string;
        id: T;
        kind: "youtube#searchResult";
        snippet?: Snippet;
    }

    export interface Response <T> {
        etag: string;
        items: Item<T>[];
        kind: "youtube#searchListResponse";
        nextPageToken: string;
        pageInfo: {
            totalResult: number;
            resultPerPage: 25
        };
        regionCode: string;
    }


    export function video ( query: string = "" ) {
        const params = {
            q: query,
            type: "video",
            part: "snippet",
            key: API_KEY,
            maxResults: 25
        };
        const url = baseURL + "/search?" + utils.encodeParams(params);


        return <Promise<Response<Video>>>fetch(url, {})
            .then( res => res.json() )
    }
}
