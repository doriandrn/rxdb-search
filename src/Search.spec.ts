import { RxCollection, isRxDocument, RxDatabase, createRxDatabase, addRxPlugin, RxCollectionCreator } from 'rxdb'
import memoryAdapter from 'pouchdb-adapter-memory'
import axios from 'axios'
import BroadcastChannel from 'broadcast-channel'

import Search from './Search'

const type = 'string'
const date = new Date()

/**
 * Data provided by
 * https://github.com/fergiemcdowall/search-index/blob/master/test/data/naughties.json
 */
const collectionCreatorFixture = {
  name: 'naughties' + date.getTime(),
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

    await BroadcastChannel.clearNodeFolder()
    try {

      db = await createRxDatabase({
        name: 'searchtestdb',
        adapter: 'memory',
        ignoreDuplicate: true
      })
    } catch (e) {
      console.error('could not create DB', e)
    }

    try {
      collection = await db.collection(collectionCreatorFixture)
      collection.searchFields.push('description')
      // collection.searchFields = ['description']
    } catch (e) {
      console.error('could not make collection', e)
    }

    // Populate with data
    try {
      const resp = await axios.get('https://raw.githubusercontent.com/fergiemcdowall/search-index/master/test/data/naughties.json')
      data = resp.data
    } catch (e) {
      console.error('could not fetch data', e)
    }

  })

  describe('Plugin init', () => {
    test('.si exists on collection', () => {
      expect(collection.si).toBeDefined()
    })
    test('collection has search', () => {
      expect(collection.search).toBeDefined()
    })

    describe('options', () => {
      describe('.searchFields', () => {
        const description = 'Fertile grounds above'
        const lang = 'test'
        beforeAll(async () => {
          await collection.insert(
            {
              date: "2000/01/01",
              description,
              lang,
            })
        })
        beforeEach(async () => {
          await db.requestIdlePromise()
        })

        test('has only description field data', async () => {
          const dic = await collection.si.DICTIONARY()
          expect(dic.length).toEqual(description.split(' ').length)

          const r = await collection.search(`${dic[0]}`)
          const r2 = await collection.search(lang)

          expect(r.length).toBeGreaterThan(0)
          expect(r2.length).toEqual(0)
        })
      })
    })
  })

  describe('Functional', () => {

    beforeEach(async () => {
      await db.requestIdlePromise()
    })

    describe('CRUD', () => {
      test('on remove', async () => {
        const description = 'wtfyayo'
        const doc = await collection.insert({
          date: "2000/01/01",
          description,
          lang: "en",
        })
        await doc.remove()
        await db.requestIdlePromise()
        const r = await collection.search(description)

        expect(r.length).toEqual(0)
      })

      test('on create', async () => {
        const description = "Teststring"
        await collection.insert(
          {
            date: "2000/01/01",
            description,
            lang: "en",
          })
        await db.requestIdlePromise()
        const r = await collection.search(description)

        expect(r.length).toBeGreaterThan(0)
      })

      test('on update', async () => {
        const description = "blabla"
        const newDesc = 'xxxooo'
        const doc = await collection.insert(
          {
            date: "2000/01/01",
            description,
            lang: "en",
          })
        await doc.atomicSet('description', newDesc)
        await db.requestIdlePromise()
        const r = await collection.search(newDesc)

        expect(r.length).toBeGreaterThan(0)
      })
    })

    describe('API', () => {
      beforeAll(async () => {
        try {
          await Promise.all(
            data.map(async doc => await collection.insert(doc))
          )
        } catch (e) {
          console.error('inserting docs failed', e)
        }
      })

      test('.search()', async () => {
        const results = await collection.search('10')
        expect(results).toBeDefined()
        expect(results.length).toBeGreaterThan(0)
      })

      test('.index()', async () => {
        try {
          await collection.index()
        } catch (e) {
          expect(e).toBeUndefined()
        }
      })
    })
  })

  afterAll(async () => {
    await db.destroy()
  })
})
