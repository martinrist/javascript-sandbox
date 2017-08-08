# Chapter 4 - Building a Complete Web App

## Hot and Cold Observables

- RxJS has two different types of Observables - _hot_ and _cold_.

- _Hot Observables_ emit values regardless of whether Observers are subscribed to them:
    - An Observer subscribed to a hot observable will receive values emitted from the moment of subscription.
    - Every other Observer subscribed at that moment will receive exactly the same value.
    - This is how JavaScript events work.
    - e.g. mouse events, stock-exchange tickers.

- _Cold Observables_ emit the entire sequence of values from the start to every Observer:
    - A cold Observable emits values only when Observers subscribe to it.
    - e.g. `Rx.Observable.range` - every new Observer receives the whole range.
    - e.g. `Rx.Observable.interval` - every new Observer receives values starting from zero.

- We can convert a _cold_ Observable to a _hot_ Observable using `publish`:
    - Creates a new Observable that acts as a proxy to the original one.
    - The new Observable has a `connect` method to start receiving values.
    - Allows us to subscribe to it before it starts running.

- If we have two subscribers that depend on a cold Observable which invokes a network call, then that network call will be made once per subscriber:
    - Use `share` to automatically create a subscription to the Observable when the number of Observers goes from zero to one.
    - This means we don't have to call `publish`.


## Buffering

- `bufferWithTime` buffers incoming values on a stream and releases them as an array every 'x' period of time:

    ```javascript
    // `source` is a 'cold' Observable that yields a value every tenth of a second
    const source = Rx.Observable.interval(100);

    // We buffer these so we get an array of items every second, rather than individual items
    const bufferedSource = source.bufferWithTime(1000);

    bufferedSource.subscribe(x => console.log("Got value: " + x));
    ```

- This can be used, for example, to batch together DOM updates (e.g. adding rows to tables):
    - Can also use `bufferWithCount` to buffer based on a count of events.
