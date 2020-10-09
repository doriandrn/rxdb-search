import { RxCollection, isRxDocument, RxDatabase, createRxDatabase, addRxPlugin, RxCollectionCreator } from 'rxdb'
import memoryAdapter from 'pouchdb-adapter-memory'
import axios from 'axios'
import BroadcastChannel from 'broadcast-channel'

import Search from './Search'

const type = 'string'

/**
 * Data provided by
 * https://github.com/fergiemcdowall/search-index/blob/master/test/data/naughties.json
 */
const collectionCreatorFixture = {
  name: 'naughties',
  schema: {
    title: 'naughty',
    version: 0,
    type: 'object',
    properties: {
      date: { type },
      description: { type },
      lang: { type },
      category1: { type },
      granularity: { type }
    },
    indexes: ['lang', 'date']
  }
}

describe('RxDB Search', () => {
  let db: RxDatabase
  let collection: RxCollection
  let data: Object[]

  beforeAll(async () => {
    try {
      addRxPlugin(memoryAdapter)
      addRxPlugin(Search)
    } catch (e) {
      console.error('could not add adapter / plugin', e)
    }

    try {
      await BroadcastChannel.clearNodeFolder()
      db = await createRxDatabase({
        name: 'testdb',
        adapter: 'memory',
        ignoreDuplicate: true
      })
    } catch (e) {
      console.error('could not create DB', e)
    }

    try {
      collection = await db.collection(collectionCreatorFixture)
    } catch (e) {
      console.error('could not make collection', e)
    }

    // Populate with data
    try {
      const { data } = await axios.get('https://raw.githubusercontent.com/fergiemcdowall/search-index/master/test/data/naughties.json')
      data.forEach(doc => collection.insert(doc))

      await db.requestIdlePromise()
    } catch (e) {
      console.error(e)
    }
  })

  describe('Plugin init', () => {
    test('idb is defined on rxdb', () => {
      expect(db.idb).toBeDefined()
    })
    test('collection has search', () => {
      expect(collection.search).toBeDefined()
    })
  })

  afterAll(async () => {
    await db.destroy()
  })
})