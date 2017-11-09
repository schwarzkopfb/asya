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
    let index = a.length - (hasInitialValue ? 1 : 2)

    return function (_, item, i, arr) {
        test.equals(item, a[ i ])
        test.equals(i, index)
        test.equals(arr, a)

        index--

        return fn.apply(this, arguments)
    }
}

equals(a.reduceRight(callback(fn)), '654321')
equals(a.reduceRight(callback(fnAsync)), '654321')
equals(a.reduceRight(callback(fn, true), '0'), '0654321')
equals(a.reduceRight(callback(fnAsync, true), '0'), '0654321')
