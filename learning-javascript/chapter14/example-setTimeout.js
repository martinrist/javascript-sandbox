console.log("Before timeout: " + new Date());

function f() {
    console.log("After timeout: " + new Date());
}

setTimeout(f, 5 * 1000);  // 5 seconds
console.log("I happen after setTimeout!")