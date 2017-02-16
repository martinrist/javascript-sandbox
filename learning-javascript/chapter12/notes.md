# Chapter 12 - Iterators & Generators

## Iterators

- Analogous to bookmarks, iterators allow us to step through an _iterable_ data structures and get each value in turn.

- For example, to get an iterator for an array, call `array.values()`:

    ```javascript
    const book = [
        "Twinkle, twinkle, little bat!",
        "How I wonder what you're at!",
        "Up above the world you fly,",
        "Like a tea tray in the sky.",
        "Twinkle, twinkle, little bat!",
        "How I wonder what you're at!"
    ];

    > const it = book.values()
    ```

- To get values, call `it.next()`, which returns an object with `value` and `done` properties:

    ```javascript
    it.next();  // { value: "Twinkle, twinkle, little bat!", done: false }
    it.next();  // { value: "How I wonder what you're at!", done: false }
    it.next();  // { value: "Up above the world you fly,", done: false }
    it.next();  // { value: "Like a tea tray in the sky.", done: false }
    it.next();  // { value: "Twinkle, twinkle, little bat!", done: false }
    it.next();  // { value: "How I wonder what  you're at!", done: false }
    it.next();  // { value: undefined, done: true }
    it.next();  // { value: undefined, done: true }
    it.next();  // { value: undefined, done: true }
    ```

- Multiple iterators against the same underlying array are independent, and maintain their own position.


## The Iteration Protocol

- The _iterator protocol_ enables any object to become iterable, by writing a _symbol method_ `[Symbol.iterator]` that returns an object with iterator behaviour, e.g.:

    ```javascript
    class Log {
        constructor() {
            this.messages = [];
        }
        add(message) {
            this.messages.push({ message, timestamp: Date.now() });
        }
        [Symbol.iterator]() {
            return this.messages.values();
        }
    }

    > const log = new Log();
    > log.add("message 1");
    > log.add("message 2");
    > log.add("message 3");
    > for (let entry of log) {
        console.log('${entry.message} @ ${entry.timestamp}');
      }
    ```

- If we don't want to use an existing function, we can write our own iterator:

    ```javascript
    [Symbol.iterator]() {
        let i = 0;
        const messages = this.messages;
        return {
            next() {
                if (i >= messages.length)
                    return { value: undefined, done: true };
                return { value: messages[i++], done: false };
            }
        }
    }
    ```

- We can write an iterator for an infinite sequence, but we need to be careful using it in a `for...of` loop:

    ```javascript
    class FibonacciSequence {
        [Symbol.iterator]() {
            let a = 0, b = 1;
            return {
                next() {
                    let rval = { value: b, done: false };
                    b += a;
                    a = rval.value;
                    return rval;
                }
            };
        }
    }
    ```


## Generators

- Generators are functions that use an iterator to control their execution. They are like a regular function with the following exceptions:
    - The function can _yield_ control back to the caller at any point.
    - When you call a generator it doesn't run, but gives you back an iterator.
    - The generator code runs when you call the iterator's `next()` method.

- Example of a generator function (with an `*` after the function name:

    ```javascript
    function* rainbow() {
        yield 'red';
        yield 'orange';
        yield 'yellow';
        yield 'green';
        yield 'blue';
        yield 'indigo';
        yield 'violet';
    }

    > const it = rainbow();
    > console.log(it.next());
    { value: 'red', done: false }
    ...
    > console.log(it.next());
    { value: 'violet', done: false }
    > console.log(it.next());
    { value: undefined, done: true }

    > for (let colour of rainbow()) {
        console.log(colour);
      }
    ```

- `yield` evaluates to the arguments provided by the caller when it calls `next(...)` on the iterator returned by the generator.  This can be used for two-way communications, e.g.:

    ```javascript
    function* interrogate() {
        const name = yield "What is your name?";
        const colour = yield "What is your favourite colour?";
        return `${name}'s favourite colour is ${colour}.`;
    }

    const it = interrogate();
    it.next();                  // { value: "What is your name?", done: false }
    it.next('Brian');           // { value: "What is your favourite colour?", done: false }
    it.next('brown');           // { value: "Brian's favourite colour is brown.", done: false }
    ```
