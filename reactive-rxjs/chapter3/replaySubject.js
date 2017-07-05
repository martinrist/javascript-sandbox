/* global require */

const Rx = require("rx");

const subject = new Rx.ReplaySubject();

subject.onNext(1);
subject.onNext(2);
subject.onNext(3);

subject.subscribe(
        n => console.log("Recieved value: ", n));

console.log("After subscription:");

subject.onNext(4);
subject.onNext(5);
subject.onNext(6);