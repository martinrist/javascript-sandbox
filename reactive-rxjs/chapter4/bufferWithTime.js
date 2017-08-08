/* global require */

const Rx = require("rx");

// `source` is a 'cold' Observable that yields a value every tenth of a second
const source = Rx.Observable.interval(100);

// We buffer these so we get an array of items every second, rather than individual items
const bufferedSource = source.bufferWithTime(1000);

bufferedSource.subscribe(x => console.log("Got value: " + x));
