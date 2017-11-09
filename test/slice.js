'use strict'

const test = require('tap'),
      AsyncArray = require('..'),
      a = AsyncArray.of(1, 2)

test.notEquals(a.slice(), a, 'new array should be created')
test.type(a.slice(), AsyncArray, 'AsyncArray should be returned')
test.type(a.slice(1), AsyncArray, 'AsyncArray should be returned')
test.same(a.slice(1), [ 2 ], 'should be sliced')
