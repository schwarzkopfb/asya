# asya

"promisified" Array descendant with some sweetener

# what does it mean?

Let's start with some fancy stuff:

```js
const AsyncArray = require('asya'),
      urls = [
          'https://www.nytimes.com/',
          'https://www.theverge.com/',
          'https://techcrunch.com/'
      ]
      
// assuming that fetch() takes an url and returns a Promise
urls.toAsync()
    .map(fetch)
    .then(pages => console.log("yay! we've got an AsyncArray containing fetched pages:", pages))
```

Get even fancier with ES7 (Node 8+):

```js
const total = await orderIds
    .toAsync()
    .reduce(async (sum, id) => sum + await getOrderAmountFromDbById(id))
    
console.log('total amount of orders:', total)
```

So, it's a modified version of the native `Array` that re-implements some of its built-in methods to accept async functions, but otherwise identical.

# caveats

There are some subtle differences between `Array` and `AsyncArray`.

- `AsyncArray` constructor cannot be invoked without the `new` keyword
- `AsyncArray.from()` only takes one argument (`mapFn` and `thisArg` are not supported)

# installation

With npm:

    npm install asya

## license

[MIT](/LICENSE)