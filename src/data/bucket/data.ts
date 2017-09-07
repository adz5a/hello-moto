import {
    fromJS,
    Map,
    Record
} from "immutable";


const encode = ( s: string ) => btoa(encodeURIComponent(s));

export const of = Record({
    url: "",
    name: ""
});

export const Null = of();

export type Bucket = typeof Null;

export interface Spec {
    name?: string;
    url?: string;
}


export const fromObject = ( bucket: Spec )  => {
    const data = of(bucket);
    const _id = encode(data.get("url") + "/" + data.get(""));

    return Map({
        _id,
        data,
        type: "bucket"
    });
}


export const NullDoc = fromObject({});

export type Doc = typeof NullDoc;

export const toObject = ( doc: Doc ) => doc.toJS();
