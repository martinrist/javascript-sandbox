# Chapter 14 - Asynchronous Programming

## Introduction

- Async programming used for things like:
    - Network access - e.g. Ajax requests
    - Filesystem operations
    - Intentionally time-delayed functionality - e.g. an alarm

- Three main 'eras' of async programming in JavaScript:
    - Callbacks
    - Promises
    - Generators


## Callbacks

- Callbacks are functions that will be invoked when something happens:
    - Passed to another function or set as an object property.

- `setTimeout` is a built-in function that runs a function at a later point in time:

    ```javascript
    console.log("Before timeout: " + new Date());

    function f() {
        console.log("After timeout: " + new Date());
    }

    setTimeout(f, 5 * 1000);  // 5 seconds
    console.log("I happen after setTimeout!")
    ```

- `setInterval` repeatedly calls the function at the specified interval forever, or until `clearInterval` is called.

- Need to be careful about scope in async code blocks.  This won't work, because by the time the function runs, `i` is `-1`:

    ```javascript
    function countdown() {
        let i;

        console.log("Countdown:");
        for (i=5; i>=0; i--) {
            setTimeout(function() {
                console.log(i===0 ? "GO!" : i);
            }, (5-i)*1000);
        }
    }
    ```

- Instead, move the variable declaration inside the `for` loop:

    ```javascript
    function countdown() {
        console.log("Countdown:");
        for (let i=5; i>=0; i--) {
            setTimeout(function() {
                console.log(i===0 ? "GO!" : i);
            }, (5-i)*1000);
        }
    }
    ```

- Node uses a convention of _error-first callbacks_:
    - The first argument of the callback function is conventionally an error if it has occurred.
    - If no error occurred, the first argument is `null` or `undefined`.
    - Need to check for this and take appropriate action if an error occurred.

- Callbacks become complex if you need to do multiple things:
    - End up with lots of deeply-nested code.
    - This is referred to as 'callback hell'.


## Promises

- Promises don't eliminate callbacks, but ensure that they are always handled in the same, predictable, manner.

- When calling a promise-based async function, it returns a `Promise` instance:
    - This can then be either _fulfilled_ (success) or _rejected_ (failure).
    - Only one of these will happen - e.g. it won't be fulfilled, then later rejected.
    - The result will happen only once.
    - Once the promise has been either fulfilled or rejected, it's considered to be _settled_.

- To create a promise, we create a `new Promise` instance, with a function that has `resolve` and `reject` callbacks:

    ```javascript
    function countdown(seconds) {
        return new Promise(function(resolve, reject) {
            for (let i=seconds; i>=0; i--) {
                setTimeout(function() {
                    if (i>0) console.log(i + '...');
                    else resolve(console.log("GO!"));
                }, (seconds-i) * 1000);
            }
        });
    }
    ```

- 
