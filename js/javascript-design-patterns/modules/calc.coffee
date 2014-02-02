Calc = (start) ->
  add: (x) ->
    start = start + x
    this

  multiply: (x) ->
    start = start * x
    this

  equals: (callback) ->
    callback start
    this

module.exports =
  add: (x, y) ->
    new Calc(x).add(y or 0)
  multiply: (x, y) ->
    new Calc(x).multiply(y or 1)
