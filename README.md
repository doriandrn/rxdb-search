# RxDB Search plugin

Minimal full text search implementation plugin for RxDB based on [search-index](https://github.com/fergiemcdowall/search-index).

### Disclaimer for v1.1.0 using search-index v2.1.0

The `on remove` test still fails, meaning the `si.DELETE` function is mishaving -  I'm clueless on how to fix it right now so please expect this to work in a further version!

## Install

```cli
npm i rxdb-search search-index --save
```
## API

Default usage:

```js
import { addRxPlugin } from 'rxdb'
import rxdbSearch from 'rxdb-search'

addRxPlugin(rxdbSearch)

...


const { RESULT, RESULT_LENGTH } = await collection.search(query: string, siQUERYoptions ?: {})
console.log(RESULT)

/*
`collection.search` is just a shortcut / an alias to si.QUERY using just the AND operator, that accepts a string as the `query` parameter.

`collection.si` can also be accessed for the complete [search-index API](https://github.com/fergiemcdowall/search-index/tree/master/docs) on the collection.
*/

const { QUERY } = collection.si
```

Please consult the [search-index API](https://github.com/fergiemcdowall/search-index/tree/master/docs) for the full operatoins you can do on the collection.

For existing datasets, you can index them by using:

```js
await collection.index()
```

__This is a costly operation and it should be done only once. Indexes add themselves up afterwards when new documents are added.__

Or index just some of them by providing an ids array argument:

```js
const ids = ['id1', 'id2']
await collection.index(ids)
```

If you're using .bulkInsert(), you may need to "manually" index the inserted documents (the .postInsert hook is not triggered as of now):

```js
const { success, error } = await collection.bulkInsert(data)

// Get ids, 'success' is an array of maps.
const ids = success.map((undefined, i) => success[i].get('_id'))
await collection.index(ids)
```

More to come soon! Stay tuned!

Suggestions, feedback or PRs are welcome!
