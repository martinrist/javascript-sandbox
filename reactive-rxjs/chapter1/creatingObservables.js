/* global require */

const Rx = require("rx");

// Manually creating an Observable and Observer

console.log("Manually creating an Observable and Observer:l");
const manualObservable = Rx.Observable.create(function (observer) {
    observer.onNext("Simon");
    observer.onNext("Jen");
    observer.onNext("Sergi");
    observer.onCompleted();
});

const manualObserver = Rx.Observer.create(
    function onNext(x) {
        console.log("Next: " + x);
    },
    function onError(err) {
        console.log("Error: " + err);
    },
    function onCompleted() {
        console.log("Completed");
    }
);

manualObservable.subscribe(manualObserver);


// Creating an observable from an array
console.log("\nCreating an Observable from an Array:");
Rx.Observable.from(["Adria", "Jen", "Sergi"])
    .subscribe(x => console.log(x));


