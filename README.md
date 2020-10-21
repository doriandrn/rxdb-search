# RxDB Search plugin

Minimal full text search implementation plugin for RxDB based on [search-index](https://github.com/fergiemcdowall/search-index).

## API

Default usage:

```js
import { addRxPlugin } from 'rxdb'
import rxdbSearch from 'rxdb-search'

addRxPlugin(rxdbSearch)

/**
 *  Additionally, you may set collection.searchFields (Array)
 * after initing the collection with your desired fields' keys to
 * search and index on.
 * If left empty (default), all fields are considered.
 *
 *  Note: '_id' or '_rev' fields are not neceessary
 */

collection.searchFields = ['name', 'description']

// or, programatically, you could use .push
collection.searchFields.push('field')


...

const results = await collection.search(query)
```

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

`collection.si` can also be accessed for the complete [search-index API](https://github.com/fergiemcdowall/search-index/tree/master/docs) on the collection.

More to come soon! Stay tuned!

Suggestions, feedback or PRs are welcome!
