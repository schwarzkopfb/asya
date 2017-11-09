'use strict'

const test = require('tap'),
      utils = require('./utils'),
      a = utils.array,
      equals = utils.equals

function fn(acc, item) {
    return '' + acc + item
}

function fnAsync(acc, item) {
    return new Promise(resolve =>
        process.nextTick(() =>
            resolve('' + acc + item)
        )
    )
}

function callback(fn, hasInitialValue) {
    let index = hasInitialValue
        ? 0
        : 1

    return function (_, item, i, arr) {
        test.equals(item, a[ i ])
        test.equals(i, index)
        test.equals(arr, a)

        index++

        return fn.apply(this, arguments)
    }
}

equals(a.reduce(callback(fn)), '123456')
equals(a.reduce(callback(fnAsync)), '123456')
equals(a.reduce(callback(fn, true), '0'), '0123456')
equals(a.reduce(callback(fnAsync, true), '0'), '0123456')
