/* global require */

const Rx = require("rx");

let evenTicks = 0;

function update(i) {
    if (i % 2 === 0) {
        evenTicks += 1;
    }
    return evenTicks;
}

const ticksObservable = Rx.Observable
    .interval(1000)
    .map(update);

// First subscriber
ticksObservable.subscribe(
    () => console.log("Subscriber 1 - evenTicks: " + evenTicks + " so far")
);

// Second subscriber
ticksObservable.subscribe(
    () => console.log("Subscriber 2 - evenTicks: " + evenTicks + " so far")
);