'use strict'

const utils = require('./utils'),
      a = utils.array,
      equals = utils.equals,
      divisibleBy = utils.divisibleBy,
      divisibleByAsync = utils.divisibleByAsync

equals(a.find(divisibleBy(3), 'thisArg'), 3)
equals(a.find(divisibleByAsync(3), 'thisArg'), 3)
equals(a.find(divisibleBy(7), 'thisArg'), undefined)
equals(a.find(divisibleByAsync(7), 'thisArg'), undefined)
