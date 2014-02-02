Promise = () ->
  data = undefined
  done = []
  fail = []
  status = 'progress'

  done: (fn) ->
    done.push(fn)
    fn(data) if status == 'done'
    this

  failed: (fn) ->
    fail.push(fn)
    fn(data) if status == 'failed'
    this

  resolve: (result) ->
    if (status != 'progress')
      throw 'Promise has already completed with status of ' + status
    status = 'done'
    data = result
    handler(data) for handler in done
    this

  fail: (reason) ->
    if (status != 'progress')
      throw 'Promise has already completed with status of ' + status
    status = 'failed'
    data = reason
    handler(data) for handler in fail
    this

module.exports = Promise