/* global require */

const Rx = require("rx");

function update(acc, i) {
    if (i % 2 === 0) {
        acc += 1;
    }
    return acc;
}

const ticksObservable = Rx.Observable
    .interval(1000)
    .scan(update, 0);

// First subscriber
ticksObservable.subscribe(
    evenTicks => console.log("Subscriber 1 - evenTicks: " + evenTicks + " so far")
);

// Second subscriber
ticksObservable.subscribe(
    evenTicks => console.log("Subscriber 2 - evenTicks: " + evenTicks + " so far")
);