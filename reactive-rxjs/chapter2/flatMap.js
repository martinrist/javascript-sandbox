/* global require */

const Rx = require("rx");

const range = Rx.Observable.range(1, 10);

range.flatMap(i => nCopies(i, i))
    .subscribe(
        e   => console.log("Value: " + e),
        err => console.log("Error: " + err),
        ()  => console.log("Completed"));

function nCopies(i, n) {
    return Rx.Observable.repeat(i, n);
}