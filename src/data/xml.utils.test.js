import { 
    parseXML,
    listPrefixes,
    foldPrefixes,
    listBucket
} from "./xml.utils";
const fetch = require("node-fetch");
const jsdom = require("jsdom");

global.fetch = fetch;

const baseURL = "https://s3.eu-west-2.amazonaws.com";
const bucket = "yolo-misc";

test("listPrefixes", () => {

    return listPrefixes({ baseURL, bucket })
        .then( value => {

            let asArray = [ ...value ];
            asArray = asArray.sort();
            expect(asArray).toMatchSnapshot();

        } );
    
});

test("listBucket", () => {

    return listBucket({ baseURL, bucket })
        .then( value => {

            expect(value).toMatchSnapshot();

        } );

} );

test("foldPrefixes", () => {

    const prefixes = [
        "a/b/c",
        "a/b",
        "d/e",
        "d/e/f",
    ];

    const res = foldPrefixes(prefixes);

    expect(typeof res).toBe("object");

    expect(res).toMatchSnapshot();
} );
