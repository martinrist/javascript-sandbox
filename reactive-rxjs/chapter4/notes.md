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