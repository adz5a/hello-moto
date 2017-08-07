// eslint-disable-next-line
"use strict";

const map = require("lodash/fp/map");
const conforms = require("lodash/fp/conforms");
const reduce = require("lodash/fp/reduce");
const isString = require("lodash/isString");

// will blow up in node
// should be mocked
const parser = new DOMParser();

const parseXML = xmlString => {

    return parser.parseFromString(xmlString, "text/xml");

};


const emptyNode = name => ({
        textContent: "",
        nodeName: name,
        childNodes: []
});

const queryNode = ( doc, nodeName ) => ( doc.querySelector(nodeName) || emptyNode(nodeName) );

const queryAllNodes = ( doc, nodeName ) => ( doc.querySelectorAll(nodeName) || [] );

const contentToJSON = content => {

    return reduce(( res, node ) => {

        res[node.nodeName] = node.textContent;
        return res;

    }, {}, content);

};

const parseContents = map( contentNode => contentToJSON(contentNode.childNodes, {}) )

const textContent = node => node.textContent;

const xmlToJSON = doc => {

    const name = queryNode(doc, "Name").textContent;
    const nextContinuationToken = queryNode(doc, "NextContinuationToken").textContent;
    const keyCount = queryNode(doc, "KeyCount").textContent;
    const maxKeys = queryNode(doc, "MaxKeys").textContent;
    //conver string to boolean
    const isTruncated = queryNode(doc, "IsTruncated").textContent === "true";
    const contents = queryAllNodes(doc, "Contents");

    return {
        contents: parseContents(contents),
        name,
        nextContinuationToken,
        keyCount,
        maxKeys,
        isTruncated,
    };

}

/*
 * Recursively fetches all prefixes in the bucket
 * All prefixes can be interpreted as "folders" ( and are created
 * when one is uploaded ).
 * @param { baseURL: string, bucket: string, prefix?: string }
 * @param set?: Set - optional, accumulator for the recursive search
 */
const listPrefixes = ( { baseURL, bucket, prefix = "" }, set = new Set() ) => {

    const prefixQuery = prefix ?
        "&prefix=" + prefix :
        ""

    return fetch(`${baseURL}/${bucket}?list-type=2&delimiter=/` + prefixQuery)
        .then( res => res.text() )
        .then(xml => {

            // list prefix and remove
            // non valid ones : empty
            // or equal to provided prefix
            const document = parser.parseFromString(xml, "text/xml");

            const prefixes = map(
                textContent,
                queryAllNodes(document, "Prefix")
            )
                .map( p => p.trim() )
                .filter( p => {

                    return  ( p.length >= 1 ) && ( p !== prefix ) && !set.has(p);

                } );

            // add all to the accumulator set
            prefixes.forEach( p => set.add(p) );

            // recur if needed
            if ( prefixes.length > 0 ) {

                return Promise.all(prefixes.map(
                    prefix => listPrefixes({
                        baseURL,
                        bucket,
                        prefix
                    },
                        set,
                    ))
                ).then(() => set);

            } else return set;

        });

}

const insert = ( res = {}, prefix, tail ) => {


    if ( !res[prefix] ) {

        res[prefix] = {};

    }

    if ( tail.length > 0 ) {

        insert(
            res[prefix],
            prefix + "/" + tail[0],
            tail.slice(1)
        );

    }

    return res;
};

const foldPrefixes = ( prefixes = [] )=> {

    return reduce( ( res, prefix = "") => {

        const [ head, ...tail ] = prefix.split("/").filter( str => str !== "" );
        return insert(res, head, tail );

    }, {}, prefixes );

};

const listBucket = ( { baseURL, name, continuationToken = "", prefix = "" } = {} ) => {

    const prefixQuery = prefix ?
        "&prefix=" + encodeURIComponent(prefix) :
        "";
    const continuationQuery = continuationToken ?
        "&continuation-token=" + encodeURIComponent(continuationToken) :
        "";

    return fetch(`${baseURL}/${name}?list-type=2${prefixQuery}${continuationQuery}`)
        .then( res => {

            if ( res.ok ) {

                return res.text();

            } else {

                return Promise.reject(res.text());

            }

        })
        .then(parseXML)
        .then(xmlToJSON);

}

/*
 * utility to use to text if a request is valid before
 * passing it to listPrefixes / listBucket
 * @param params: any - value to test
 *
 */
const isValidRequest = conforms({
    baseURL: val => isString(val) && val.length > 0,
    bucket: val => isString(val) && val.length > 0,
    prefix: val => val === undefined || isString(val)
});

module.exports = {
    parseXML,
    emptyNode,
    queryNode,
    queryAllNodes,
    listPrefixes,
    isValidRequest,
    listBucket,
    xmlToJSON,
    foldPrefixes
};
