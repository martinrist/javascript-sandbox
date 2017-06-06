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

