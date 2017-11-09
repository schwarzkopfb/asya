'use strict'

const test = require('tap'),
      utils = require('./utils'),
      a = utils.array,
      equals = utils.equals,
      callback = utils.callback,
      r1 = [],
      r2 = [],
      expected = [ 1, 4, 9, 16, 25, 36 ]

function fn(n) {
    r1.push(n * n)
}

function fnAsyn(n) {
    return new Promise(resolve => {
        process.nextTick(() => {
            r2.push(n * n)
            resolve()
        })
    })
}

const p1 = a.forEach(callback(fn), 'thisArg')
equals(p1, undefined)
p1.then(() => test.same(r1, expected))

const p2 = a.forEach(callback(fnAsyn), 'thisArg')
equals(p2, undefined)
p2.then(() => test.same(r2, expected))
