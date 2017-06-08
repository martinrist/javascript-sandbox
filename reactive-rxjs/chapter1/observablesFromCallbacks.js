/* global require */
const Rx = require("rx");
const fs = require("fs");

const readdir = Rx.Observable.fromNodeCallback(fs.readdir);

const source = readdir("..");

source.subscribe(res => console.log("Array of entries: " + res));

source.flatMap(res => Rx.Observable.from(res)).subscribe(e => console.log("Entry: " + e));