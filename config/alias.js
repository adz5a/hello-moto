"use strict";
const paths = require('./paths');
const { resolve } = require("path");


const isTest = process.env.BABEL_ENV === "test" || process.env.NODE_ENV === "test"
console.log("isTest");
const pouchdbAlias = isTest ? "pouchdb-memory" : "pouchdb";



module.exports = {
    "views": resolve(paths.appSrc, "views"),
    "data": resolve(paths.appSrc, "data"),
    "api": resolve(paths.appSrc, "api"),
    "components": resolve(paths.appSrc, "components"),
    "pouchdb": pouchdbAlias
};
