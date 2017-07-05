/* global require */

const Rx = require("rx");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const RxDom = require("rx-dom")

function get(url) {
    let subject;

    return Rx.Observable.create(function(observer) {
        if (!subject) {
            subject = new Rx.AsyncSubject();
            RxDom.DOM.get(url).subscribe(subject);
        }
        return subject.subscribe(observer);
    });
}

const headers = get("http://httpbin.org/headers");

// Will trigger request and receive the response when read
headers.subscribe(
    result => console.log("Result 1: ", result.response),
    err    => console.log("ERROR", err));

// Will receive the result immediately because it's cached
setTimeout(() =>
    headers.subscribe(
        result => console.log("Result 1: ", result.response),
        err    => console.log("ERROR", err)), 5000);