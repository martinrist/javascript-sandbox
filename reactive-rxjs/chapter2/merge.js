/* global require */

const Rx = require("rx");

const a = Rx.Observable.interval(200).map(i => 'A' + i);
const b = Rx.Observable.interval(100).map(i => 'B' + i);

Rx.Observable.merge(a, b)
    .take(20)
    .subscribe(
        e   => console.log("Next: " + e),
        err => console.log("Error: " + err),
        ()  => console.log("Completed"));
