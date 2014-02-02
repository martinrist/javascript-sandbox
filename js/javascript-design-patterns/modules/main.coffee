require.config
  baseUrl: '../js/javascript-design-patterns/modules'

require ['util'], (util) ->
  window.util = util
  this