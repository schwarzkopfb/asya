'use strict'

const test = require('tap'),
      AsyncArray = require('..'),
      utils = require('./utils'),
      a = utils.array,
      same = utils.same,
      divisibleBy = utils.divisibleBy,
      divisibleByAsync = utils.divisibleByAsync


same(a.filter(divisibleBy(1), 'thisArg'), [ 1, 2, 3, 4, 5, 6 ])
same(a.filter(divisibleBy(2), 'thisArg'), [ 2, 4, 6 ])
same(a.filter(divisibleByAsync(1), 'thisArg'), [ 1, 2, 3, 4, 5, 6 ])
same(a.filter(divisibleByAsync(2), 'thisArg'), [ 2, 4, 6 ])

a.filter(() => {})
 .then(result => test.type(result, AsyncArray))
