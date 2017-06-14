/* global require */

const Rx = require("rx");

const counter = Rx.Observable.interval(1000);

const subscription1 = counter.subscribe(
    i   => console.log("Subscription 1: ", i),
    err => console.log("Subscription 1 Error: ", err),
    ()  => console.log("Subscription 1 Completed"));
const subscription2 = counter.subscribe(
    i   => console.log("Subscription 2: ", i),
    err => console.log("Subscription 2 Error: ", err),
    ()  => console.log("Subscription 2 Completed"));

setTimeout(() => {
    console.log("Cancelling subscription 2!");
    subscription2.dispose();
}, 2000);

setTimeout(() => {
    console.log("Cancelling subscription 1!");
    subscription1.dispose();
}, 5000);