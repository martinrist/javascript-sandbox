/* global require */

const Rx = require("rx");


function getJSON(arr) {
    return Rx.Observable.from(arr)
        .map(str => JSON.parse(str));
}

const invalidJsons = ['{"1": 1, "2": 2}', '{"success: true}', '{"enabled": true}' ];

getJSON(invalidJsons).subscribe(
    json => console.log("Parsed JSON: ", json),
    err  => console.log(err.message),
    ()   => console.log("Completed"));