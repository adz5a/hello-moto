import {
    // LIST_DIRS,
    // LIST_CONTENT,
    // SAVE,
    // SAVE_BUCKET,
    // SAVE_ALL
    ADD_BUCKET
} from "data/bucket";
import {
    // listPrefixes,
    // foldPrefixes,
    // listBucket
} from "data/xml.utils";
import { MiddlewareFactory } from "data/middlewareFactory";

export const middleware = MiddlewareFactory({
    [ADD_BUCKET]: data => {
        console.log(data);
        return data;
    }
});
