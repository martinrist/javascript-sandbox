/* global require */

const Rx = require("rx");

const source = Rx.Observable.interval(300)
    // These messages are emitted asynchronously, so don't appear immediately
    .map(v => "Interval message #" + v)
    .take(5);

const asyncSubject = new Rx.AsyncSubject();

source.subscribe(asyncSubject);

source.subscribe(
    v  => console.log("Direct subscription to source: " + v),
    e  => console.log("Source raised error: " + e),
    () => console.log("Source completed"));

asyncSubject.subscribe(
    v  => console.log("Async subject: " + v),
    e  => console.log("Async subject: " + e),
    () => console.log("Async subject completed"));

setTimeout(() => asyncSubject.subscribe(
    v  => console.log("Later async subject subscription: " + v),
    e  => console.log("Later async subject error: " + e),
    () => console.log("Later async subject completed")), 5000);