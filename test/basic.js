'use strict'

const AE = require('assert').AssertionError,
      test = require('tap'),
      AsyncArray = require('..'),
      a = new AsyncArray,
      s = [ 1 ]

test.equals(AsyncArray, AsyncArray.default)
test.equals(AsyncArray, AsyncArray.AsyncArray)

test.ok(Array.isArray(a))
test.ok(Array.isAsyncArray(a))
test.notOk(Array.isAsyncArray(s))

test.ok(AsyncArray.isArray(a))
test.ok(AsyncArray.isAsyncArray(a))
test.notOk(AsyncArray.isAsyncArray(s))

test.ok(Array.isArray(a.toArray()))
test.ok(Array.isAsyncArray(s.toAsync()))

test.ok(Array.isAsyncArray(AsyncArray.of()))
test.ok(Array.isAsyncArray(AsyncArray.from()))
test.ok(Array.isAsyncArray(AsyncArray.from(s)))

test.throws(() => {
    AsyncArray.from([], () => {})
}, AE)

test.equals(s.toAsync().toString(), s.toString())
test.equals(s, s.toArray())
test.equals(a, a.toAsync())
test.type(a, Array)
test.type(a, AsyncArray)

test.notEquals(a.constructor, s.constructor)
test.notEquals(AsyncArray.prototype, Array.prototype)

test.same(AsyncArray.from([ 1, 2, 3, 4 ]), [ 1, 2, 3, 4 ])
~function() {
    test.same(AsyncArray.from(arguments), [ 1, 2, 3, 4 ])
}(1, 2, 3, 4)
test.same(AsyncArray.of(1, 2, 3, 4), [ 1, 2, 3, 4 ])
