/* global require */

const Rx = require("rx");

const range = Rx.Observable.range(1, 10);
const sum = range.reduce((acc, x) => acc + x);

const count = range.reduce((acc, x) => acc + 1);

sum.subscribe(
        e   => console.log("Sum - Value: " + e),
        err => console.log("Sum - Error: " + err),
        ()  => console.log("Sum - Completed"));

count.subscribe(
    e   => console.log("Count - Value: " + e),
    err => console.log("Count - Error: " + err),
    ()  => console.log("Count - Completed"));
