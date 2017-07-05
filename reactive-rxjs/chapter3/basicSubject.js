/* global require */

const Rx = require("rx");

const subject = new Rx.Subject();

const source = Rx.Observable.interval(300)
    // These messages are emitted asynchronously, so don't appear immediately
    .map(v => "Interval message #" + v)
    .take(5);

// Subscribes the subject to the source
source.subscribe(subject);

// Then adds a subscription to the subject
subject.subscribe(
    x  => console.log("onNext: " + x),
    e  => console.log("onError: " + e.message),
    () => console.log("onCompleted")
);

// These messages are 'injected' directly into the subject
// and don't come from the source.
// These come first, because they're synchronous
subject.onNext("Our message #1");
subject.onNext("Our message #2");

setTimeout(() => subject.onCompleted(), 1000);