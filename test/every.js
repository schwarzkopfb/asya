'use strict'

const utils = require('./utils'),
      a = utils.array,
      equals = utils.equals,
      divisibleBy = utils.divisibleBy,
      divisibleByAsync = utils.divisibleByAsync

equals(a.every(divisibleBy(1), 'thisArg'), true)
equals(a.every(divisibleBy(2), 'thisArg'), false)
equals(a.every(divisibleByAsync(1), 'thisArg'), true)
equals(a.every(divisibleByAsync(2), 'thisArg'), false)
