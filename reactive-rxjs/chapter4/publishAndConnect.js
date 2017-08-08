/* global require */

const Rx = require("rx");

// `source` is a 'cold' Observable that yields a value every second
const source = Rx.Observable.interval(1000);

// convert `source` to a 'hot' Observable using `publish`
const publisher = source.publish();

// even if we are subscribing, no values are pushed yet...
const observer1 = publisher.subscribe(
    x => console.log("Observer 1: Value: " + x)
);

console.log("Observer1 subscribed to publisher but not connected");

setTimeout(() => {
    console.log("Connecting publisher...");
    publisher.connect();
}, 3000);

setTimeout(() => {
    console.log("Connecting observer2...");
    const observer2 = publisher.subscribe(
        x => console.log("Observer 2: Value: " + x)
    );
}, 7000);