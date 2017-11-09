'use strict'

const utils = require('./utils'),
      a = utils.array,
      equals = utils.equals,
      divisibleBy = utils.divisibleBy,
      divisibleByAsync = utils.divisibleByAsync

equals(a.some(divisibleBy(2), 'thisArg'), true)
equals(a.some(divisibleBy(7), 'thisArg'), false)
equals(a.some(divisibleByAsync(2), 'thisArg'), true)
equals(a.some(divisibleByAsync(7), 'thisArg'), false)
