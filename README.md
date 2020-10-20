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
 * after initing the collection with your desired fields' key to
 * search and index on.
 * If left empty (default), all fields are considered.
 *
 *  Note: '_id' or '_rev' fields are not neceessary
 */

collection.searchFields = ['name', 'description']

// or, programatically, you could use .push
collection.searchFields.push('field')


...

const results = collection.search(query)
```

For existing datasets, you can index them by using:

```js
await collection.index()
```

This is a costly operation and it should be done only once. Indexes add themselves up afterwards when new documents are added.

`collection.si` can also be accessed for the complete [search-index API on the collection](https://github.com/fergiemcdowall/search-index/tree/master/docs).

More to come soon! Stay tuned!

Suggestions, feedback or PRs are welcome!
