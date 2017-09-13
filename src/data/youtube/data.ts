import { Map } from "immutable";
const API_KEY = "AIzaSyDItu4uyFuEaDNn6XF1u7R2eA3DRT_IUk8";

// type IRecord = 

export namespace utils {

    export const encodeParams = ( params: { [k: string]: string | number } ): string =>
        Object.keys(params)
            .reduce(( s: string, key: string ) => {

                return s + key + "=" + params[key] + "&";

            }, "");

}


/*
 * Describes the youtube search api
 *
 *
 */
export namespace search {

    export const baseURL = "https://www.googleapis.com/youtube/v3";

    export interface C {
        kind: "youtube#channel";
        channelId: string;
    }

    export interface V {
        kind: "youtube#video";
        videoId: string;
    }

    export type Kinds = C | V;

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

    export interface Video extends Item<V> {}
    export interface Channel extends Item<C> {}

    export interface Response <T> {
        etag: string;
        items: T[];
        kind: "youtube#searchListResponse";
        nextPageToken: string;
        pageInfo: {
            totalResult: number;
            resultPerPage: 25
        };
        regionCode: string;
    }


    export function video ( query: string = "", maxResults: number = 10 ) {
        const params = {
            q: query,
            type: "video",
            part: "snippet",
            key: API_KEY,
            maxResults
        };
        const url = baseURL + "/search?" + utils.encodeParams(params);


        return <Promise<Response<Video>>>fetch(url, {})
            .then( res => res.json() )
    }
}
