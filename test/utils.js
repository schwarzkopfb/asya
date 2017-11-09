'use strict'

const test = require('tap')

if (module === require.main)
    return test.pass('this module is not intended to be executed directly')

const array = require('..').of(1, 2, 3, 4, 5, 6)

module.exports = {
    same,
    equals,
    callback,
    divisibleBy,
    divisibleByAsync,
    array
}

function equals(p, value) {
    p.then(
        result => test.equals(result, value),
        error => test.fail('promise rejected')
    )
}

function same(p, value) {
    p.then(
        result => test.same(result, value),
        error => test.fail('promise rejected')
    )
}

function callback(fn) {
    let index = 0

    return function (item, i, arr) {
        test.equals(item, array[ i ])
        test.equals(i, index)
        test.equals(arr, array)
        test.equals(this, 'thisArg')

        index++

        return fn.apply(this, arguments)
    }
}

function divisibleBy(d) {
    return callback(n => n % d === 0)
}

function divisibleByAsync(d) {
    return callback(function (n) {
        return new Promise(resolve =>
            process.nextTick(() =>
                resolve(n % d === 0)
            )
        )
    })
}
