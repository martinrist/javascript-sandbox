# RxJS-vs-Bacon Discussion

## Links

* [Why Bacon?](https://github.com/baconjs/bacon.js#why-bacon)
* [BaconJS for RxJS Users](https://baconjs.github.io/api.html#for-rxjs-users)
* [RxJS for Bacon.js Users](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/mapping/bacon.js/whyrx.md)
* ['Reactive JavaScript Programming' video](https://www.safaribooksonline.com/library/view/reactive-javascript-programming/9781787284913/)

## Comparison Points

* Multi-langauge bindings (Rx) vs single-language (Bacon)
* Hot vs Cold Observables (RxJS only)
* EventStream vs Property (Bacon only)
* Performance tradeoffs (Bacon slower for glitch-free performance)
* Glitch-free / atomic updates (Bacon properties)
* Lazy evaluation (Bacon)
* Error handling - Errors terminate stream (RxJS) vs multiple errors (Bacon)
* Packaging - different subsets / cut-down versions (RxJS)
* Testing using Schedulers (RxJS) - can you do similar with Bacon?


## Misc other points

* Why they're not officially *F*RP (continuous time)
* Bacon's origin from RxJS (originally not open source)
* Bacon - CoffeeScript?