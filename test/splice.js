'use strict'

const test = require('tap'),
      AsyncArray = require('..'),
      a = AsyncArray.of(1, 2, 3),
      spliced = a.splice(1, 1, 4)

test.type(spliced, AsyncArray, 'AsyncArray should be returned')
test.notEquals(a, spliced, 'new array should be returned')
test.same(a, [ 1, 4, 3 ], 'array should be spliced')
test.same(spliced, [ 2 ], 'removed elements should be returned')
