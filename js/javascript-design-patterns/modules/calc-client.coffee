Calc = require './calc.js'

Calc.add 1, 2
.multiply 3
  .equals (result) ->
      console.log result