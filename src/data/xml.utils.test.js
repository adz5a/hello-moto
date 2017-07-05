import { 
    parseXML,
    listPrefixes,
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

            console.log(value);
            expect(value).toMatchSnapshot();

        } );
    
});

test("listBucket", () => {

    return listBucket({ baseURL, bucket })
        .then( value => {

            console.log(value);
            expect(value).toMatchSnapshot();

        } );

} );
