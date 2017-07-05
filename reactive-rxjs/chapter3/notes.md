# Chapter 3 - Building Concurrent Programs

## Purity and the Observable Pipeline

- An _Observable pipeline_ is a group of operators chained together:
    - Each takes an Observable as input and returns an Observable as output.
    - All state flows from one operator to the next, without the need for any external variables.

    ```javascript
    Rx.Observable
        .from([1, 2, 3, 4, 5, 6, 7, 8])
        .filter(val => val % 2)
        .map(val => val * 10)
    ```

- Operators in a pipeline should always use pure functions:
    - Mutating state outside the pipeline can lead to unexpected bugs.

- For example, here we have an Observable that maps an impure function (that updates `evenTicks`):
    - The Observable pipeline runs once for each subscriber.
    - As a result, `evenTicks` gets updated twice, and produces the wrong result.

    ```javascript
    let evenTicks = 0;

    function update(i) {
        if (i % 2 === 0) {
            // Changes external state
            evenTicks += 1;
        }
        return evenTicks;
    }

    const ticksObservable = Rx.Observable
        .interval(1000)
        .map(update);

    // First subscriber
    ticksObservable.subscribe(
        () => console.log("Subscriber 1 - evenTicks: " + evenTicks + " so far")
    );

    // Second subscriber
    ticksObservable.subscribe(
        () => console.log("Subscriber 2 - evenTicks: " + evenTicks + " so far")
    );
    ```

- Instead, change `update` to be a pure function that accumulates values, and use `scan`:

    ```javascript
    // This function is now pure, returns an accumulator
    function update(acc, i) {
        if (i % 2 === 0) {
            acc += 1;
        }
        return acc;
    }

    const ticksObservable = Rx.Observable
        .interval(1000)
        // Here we use `scan` in place of `map`
        .scan(update, 0);

    // First subscriber
    ticksObservable.subscribe(
        evenTicks => console.log("Subscriber 1 - evenTicks: " + evenTicks + " so far")
    );

    // Second subscriber
    ticksObservable.subscribe(
        evenTicks => console.log("Subscriber 2 - evenTicks: " + evenTicks + " so far")
    );
    ```

- Pipelines are efficient:
    - Chaining operators avoid the creation of intermediate Observables.
    - Unlike counterpart methods on arrays.
    - Also, they have _lazy evaluation_, so functions aren't called if (for example), we use `take`.


## The `Subject` Class

- A `Subject` is a type that implements both Observer and Observable:
    - It can subscribe to Observables (acting as an Observer).
    - It can act as an Observable itself, producing values and having other Observers subscribe to it.
    - As a result, it can act as a sort of bridge, or proxy, between a datasource and a subject's listeners.

- `AsyncSubject` emits the last value of the sequence only if the sequence completes (and after it completes):
    - Any Observer that subscribes after the value has been emitted will receive it straight away.
    - Useful for async operations that return a single value - e.g. Ajax requests.

![Marble Diagram - AsyncSubject](images/asyncSubjectDiagram.png)

- `BehaviorSubject` receives the last emitted value and then all the subsequent values:
    - Requires that we provide a starting value, so that all observers subscribed to a `BehaviourSubject` receive a value.

- Useful for if we want to put up placeholder text until a remote file has downloaded, at which point we want to replace the placeholder with the actual text:

    ```javascript
    const subject = new Rx.BehaviorSubject("Waiting for content");

    subject.subscribe(
        result => document.body.textContent = result.response || result,
        err    => document.body.textContent = "There was an error retrieving content");

    Rx.DOM.get("/remote/content").subscribe(subject);
    ```

- `ReplaySubject` caches its values and re-emits them to any Observer that subscribes late to it:
    - First parameter takes a number that represents how large a buffer of values is held.
    - Second parameter is a time in milliseconds for which to buffer values.
