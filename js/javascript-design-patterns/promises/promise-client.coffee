Promise = require('./promise.js')

promise = new Promise()

setTimeout(() ->
  promise.resolve()
, 1000)

setTimeout(() ->
  promise.done((data) ->
    console.log('Handler added after deferred object is done')
  )
, 2000)

promise.done((data) ->
  console.log('Deferred object has completed')
)

promise2 = new Promise()

promise2.failed(() ->
  console.log('Promise #2 failed')
).done(() ->
  console.log('Promise #2 completed')
)

setTimeout(() ->
  promise2.fail()
, 1000)

console.log('application completed')