'use strict'

const test = require('tap'),
      AsyncArray = require('..'),
      a = AsyncArray.of(1, 2),
      b = AsyncArray.of(3, 4),
      c = [ 1, 2 ],
      d = [ 3, 4 ],
      e = [ 1, 2, 3, 4, 5 ]

test.notEquals(a.concat(), a, 'new array should be created')
test.type(a.concat(), AsyncArray, 'AsyncArray should be returned')
test.same(a.concat(d, 5), e, 'AsyncArray and Array should be concatenated')
test.same(c.concat(b, 5), e, 'Array and AsyncArray should be concatenated')
