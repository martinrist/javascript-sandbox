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

## Of Observers and Iterators

- RxJS's `Observables` are based on a combination of two patterns:
    - The [_Observer_ pattern](http://en.wikipedia.org/wiki/Observer_pattern)
    - The [_Iterator_ pattern](https://en.wikipedia.org/wiki/Iterator_pattern)

- In the _Observer_ pattern, we have an object called a _Producer_ that keeps an internal list of _Listeners_ subscribed to it:
    - _Listeners_ are notified when the state of the _Producer_ changes.
    - _Producers_ are also called _Subjects_, but RxJS has its own _Subject_ which is different.
    - _Observer_ therefore decouples producers and listeners.

- The _Iterator_ pattern defines an object that provides a consumer with an easy way to traverse its contents, hiding its implementation:
    - A typical iterator has a `next()` method to retrieve the next item, and `hasNext()` to check if there are any items left.


## The Rx Pattern and the Observable

- The _Rx Pattern_ combines both the _Observer_ and _Iterable_ patterns to produce an _Observable sequence_, or _Observable_:
    - _Observables_ emit their values in order, like an iterator.
    - The _Observable_ 'pushes' values to consumers as they become available, like _Producers_.

- Another way of thinking about this is that an _Observable_ is a sequence whose items become available over time:
    - An _Observer_ subscribed to an _Observable_ will received the values of the sequence as they become available, without having to request them.

- _Observables_ fill a gap by being a way of accessing asynchronous sequences of multiple items, as shown in the following table:

|                    |single items          |multiple items            |
|--------------------|----------------------|--------------------------|
|synchronous / pull  |`T getData()`         |`Iterable<T> getData()`   |
|asynchronous / push |`Future<T> getData()` |`Observable<T> getData()` |
