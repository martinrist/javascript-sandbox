/* global require */

const Rx = require("rx");

const rangeObservable = Rx.Observable.range(1, 5);

rangeObservable.subscribe(
        e   => console.log("Next: " + e),
        err => console.log("Error: " + err),
        ()  => console.log("Completed"));
