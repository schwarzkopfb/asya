'use strict'

const test = require('tap'),
      AsyncArray = require('..'),
      utils = require('./utils'),
      a = utils.array,
      same = utils.same,
      callback = utils.callback,
      expected = [ 1, 4, 9, 16, 25, 36 ]

function fn(n) {
    return n * n
}

function fnAsync(n) {
    return new Promise(resolve =>
        process.nextTick(() =>
            resolve(n * n)
        )
    )
}

same(a.map(callback(fn), 'thisArg'), expected)
same(a.map(callback(fnAsync), 'thisArg'), expected)

a.map(() => {})
 .then(result => test.type(result, AsyncArray))
