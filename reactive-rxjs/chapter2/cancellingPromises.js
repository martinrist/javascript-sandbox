/* global require */

const Rx = require("rx");

const p = new Promise((resolve, reject) =>
    // This still gets called, even after the subscription to it is disposed
    setTimeout(resolve, 5000)
);

p.then(() => console.log("Potential side-effect!"));

const subscription = Rx.Observable.fromPromise(p)
    .subscribe(() => console.log("Observable resolved!"));

subscription.dispose();
