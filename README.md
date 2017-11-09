# asya

"promisified" Array descendant with some sweetener

# caveats

- must use `new`
- `AsyncArray.from()` only takes one argument (`mapFn` and `thisArg` are not supported)
- `sort()` does __not__ take async function
