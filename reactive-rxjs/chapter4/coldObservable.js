/* global require */

const Rx = require("rx");

// interval produces a 'cold' Observable
const source = Rx.Observable.interval(2000);

const observer1 = source.subscribe(
    x => console.log("Observer 1: Value: " + x)
);

// observer2 starts after three seconds
// but receives values starting from zero
setTimeout(() => {
    const observer2 = source.subscribe(
            x => console.log("Observer 2: Value: " + x));
}, 3000);