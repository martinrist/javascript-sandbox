/* global require */

const Rx = require("rx");

const range = Rx.Observable.range(1, 10);
const odds = range.filter(x => x % 2 === 1);

odds.subscribe(
        e   => console.log("Next: " + e),
        err => console.log("Error: " + err),
        ()  => console.log("Completed"));
