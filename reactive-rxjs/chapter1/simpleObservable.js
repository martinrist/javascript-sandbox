/* global require */

const Rx = require("rx");

Rx.Observable.just("Hello World!")
    .subscribe(value => console.log(value),
               err   => console.log(err),
               ()    => console.log("All values received!"));