'use strict'

const assert   = require('assert'),
      ancestor = Array.prototype,
      concat   = ancestor.concat,
      slice    = ancestor.slice,
      every    = ancestor.every,
      filter   = ancestor.filter,
      splice   = ancestor.splice,
      some     = ancestor.some,
      map      = ancestor.map

class AsyncArray extends Array {
    static from(arrayLike) {
        assert(arguments.length <= 1, 'mapFn and thisArg are not supported. Use Array.from(...).toAsync() instead.')

        const array = new AsyncArray

        for (let key in arrayLike)
            if (arrayLike.hasOwnProperty(key))
                array[ key ] = arrayLike[ key ]

        return array
    }

    static of() {
        return convert(Array.of.apply(null, arguments))
    }

    toArray() {
        return Object.setPrototypeOf(this, ancestor)
    }

    concat(items) {
        return convert(concat.apply(this, arguments))
    }

    every(callback, thisArg) {
        return Promise
            .all(map.call(this, callback, thisArg))
            .then(result => every.call(result, value => value))
    }

    filter(callback, thisArg) {
        return Promise
            .all(map.call(this, callback, thisArg))
            .then(result => filter.call(this, (_, i) => result[ i ]))
            .then(convert)
    }

    find(callback, thisArg) {
        return this
            .findIndex(callback, thisArg)
            .then(index => ~index
                ? this[ index ]
                : undefined)
    }

    findIndex(callback, thisArg) {
        const array  = this,
              length = this.length

        let i = -1

        return function next() {
            if (++i < length) {
                const result = callback.call(thisArg, array[ i ], i, array)

                if (result) {
                    if (result instanceof Promise)
                        return result.then(value => {
                            if (value)
                                return Promise.resolve(i)
                            else
                                return next()
                        })
                    else
                        return Promise.resolve(i)
                }
                else
                    return next()
            }
            else
                return Promise.resolve(-1)
        }()
    }

    forEach(callback, thisArg) {
        return this
            .map(callback, thisArg)
            .then(() => {})
    }

    map(callback, thisArg) {
        return Promise
            .all(map.call(this, callback, thisArg))
            .then(convert)
    }

    reduce(callback, initialValue) {
        const array  = this,
              length = this.length

        let i = -1,
            acc = arguments.length > 1
                ? initialValue
                : this[ ++i ]

        return function next(acc) {
            if (++i < length)
                return Promise.resolve(callback(acc, array[ i ], i, array)).then(next)
            else
                return Promise.resolve(acc)
        }(acc)
    }

    reduceRight(callback, initialValue) {
        const array = this

        let i = this.length,
            acc = arguments.length > 1
                ? initialValue
                : this[ --i ]

        return function next(acc) {
            if (--i >= 0)
                return Promise.resolve(callback(acc, array[ i ], i, array)).then(next)
            else
                return Promise.resolve(acc)
        }(acc)
    }

    slice() {
        return convert(slice.apply(this, arguments))
    }

    some(callback, thisArg) {
        return Promise
            .all(map.call(this, callback, thisArg))
            .then(result => some.call(result, value => value))
    }

    splice(start, deleteCount, items) {
        return convert(splice.apply(this, arguments))
    }
}

function convert(array) {
    return Object.setPrototypeOf(array, AsyncArray.prototype)
}

function toAsyncArray() {
    return convert(this)
}

function isAsyncArray(obj) {
    return obj instanceof AsyncArray
}

ancestor.toAsync = toAsyncArray

exports = module.exports = AsyncArray
exports.default = exports.AsyncArray = AsyncArray
exports.isArray = Array.isArray
exports.isAsyncArray = Array.isAsyncArray = isAsyncArray
