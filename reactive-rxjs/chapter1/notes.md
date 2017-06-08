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

- Observables have the following main differences compared to the traditional Observer pattern:
    - Observables don't start streaming items until they have at least one Observer subscribed to them.
    - Like Iterators, an Observable can signal when the sequence is completed.


## Creating Observables

- Many ways to create an Observable, the `create` operator being the most obvious.  It takes a callback that accepts an `observer` as a parameter and defines sequence of emitted values:

    ```javascript
    var observable = Rx.Observable.create(function(observer) {
        observer.onNext("Simon");
        observer.onNext("Jen");
        observer.onNext("Sergi");
        observer.onCompleted();
    });
    ```

- _Observers_ listen to Observables, doing so by implementing three methods:
    - `onNext` - called when the Observable emits a new value.
    - `onError` - called when an error occurs in the Observable.
    - `onCompleted` - called when the Observable has signalled that there is no more data.  After a call to `onCompleted`, there are guaranteed to be no more calls to `onNext` or `onError`.

- We can create a new Observer by calling `Rx.Observer.create()` with handler functions for the three cases:

    ```javascript
    var observer = Rx.Observer.create(
        function onNext(x)     { console.log("Next: " + x); },
        function onError(err)  { console.log("Error: " + err); }.
        function onCompleted() { console.log("Completed"); }
    );
    ```

- To connect the Observer to the Observable, we call `subscribe`:

    ```javascript
    observable.subscribe(observer);
    ```

- Methods that transform or query sequences are called _operators_:
    - Located in the static `Rx.Observable` object and in Observable instances.
    - e.g. `create`

- RxJS has lots of operators that create Observables for common sources, e.g.:
    - `empty()` - emits no items but terminates normally.
    - `from(o)` - converted from another objects (e.g. iterables).
    - `interval(ms)` - emits a sequence of integers spaced by a time interval.
    - `just(o)` - emits a single object.
    - `range(n, m)` - emits a range of sequential integers.
    - `timer(ms)` - emits a single item after a given delay.

- There is an [RxJS DOM](https://github.com/Reactive-Extensions/RxJS-DOM) library that also provides ways of creating Observables from DOM-related sources:
    - `get(url)` - from an Ajax call.
    - 

- Generally recommended to have all data in Observables:
    - e.g. if you have an array whose items need to be used in combination with other data, use `from` to create an Observable from the array:

    ```javascript
    Rx.Observable.from(["Adria", "Jen", "Sergi"])
        .subscribe(x => console.log("Next: " + x));
    ```

- If working in the browser, you can create an Observable from an event:

    ```javascript
    Rx.Observable.fromEvent(document, "mousemove")
        .subscribe(e => console.log(e.clientX, e.clientY);
    ```

- We can transform existing Observables.  Since Observables are immutable, the new Observables are then independent and can be used for different tasks:

    ```javascript
    // All mousemove events are logged with their coordinates
    const allMoves = Rx.Observable.fromEvent(document, "mousemove");
    allMoves.subscribe(e => console.log(e.clientX, e.clientY));

    // Filtered Observable that only has events where the mouse is on the right
    const movesOnRight = allMoves.filter(e => e.clientX > window.innerWidth / 2);
    movesOnRight.subscribe(e => console.log("Mouse is on the right"));
    ```

- Observers can be created from callback functions - either vanilla (using `fromCallback`) or Node.js-style (using `fromNodeCallback`) where the error argument is first:

    ```javascript

