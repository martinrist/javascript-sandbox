# Chapter 1 - The Reactive Way

## What's Reactive?

- An `Observable` represents a stream of data, e.g.:
    - A remote source of data.
    - Mouse clicks from a user.
    - Timer events.

- Reactive programming allows you to write programs in terms of transformations on streams of events.

- It's highly expressive.  For example, throttling mouse clicks would be much more complex using callbacks or promises:

    ```javascript
    const clicks = Rx.Observable.fromEvent(button, 'click');
    clicks.debounce(1000)
        .subscribe(...)
    ```

- Subscriptions can include functions to run on next values, errors and completion:

    ```javascript
    obs.subscribe(
        function(value) { console.log('Received value', value); },
        function(err)   { console.log(err); },
        function()      { console.log('All values retrieved!'); }
    );

    // Alternatively using ES6 arrow notation:
    obs.subscribe(
        value => console.log('Received value', value),
        err   => console.log(err),
        ()    => console.log('All values retrieved!')
    )
    ```

- Spreadsheets are the classic example of a reactive system.

- Mouse clicks can be seen as an infinite sequence of events generated in real-time as the user clicks:
    - Idea by Erik Meijer (RxJS inventor)
    - Proposed in paper ["Your Mouse is a Database"](http://queue.acm.org/detail.cfm?id=2169076)
    - In reactive programming we see this as a stream of events that we can manipulate as a whole.
    - A bit like an array, where elements are separated by time instead of memory.

- We can apply operations like filtering, mapping etc to an entire stream, then subscribe to the results:

    ```javascript
    // Log the first 10 clicks in the right hand half
    Rx.Observable.fromEvent(document, "click")
        .filter(c => c.clientX > window.innerWidth / 2)
        .take(10)
        .subscribe(c => console.log(c.clientX, c.clientY));
    ```

- Compare the traditional approach, which requires state (in `clicks`) and has to make sure to unregister the listener at the end:

    ```javascript
    let clicks = 0;
    document.addEventListener("click", function registerClicks(e) {
        if (clicks < 10) {
            if (e.clientX > window.innerWidth / 2) {
                console.log(e.clientX, e.clientY);
                clicks += 1;
            }
        } else {
            document.removeEventListener("click", registerClicks);
        }
    });
    ```


