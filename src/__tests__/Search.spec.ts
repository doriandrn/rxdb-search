import { RxCollection, RxDatabase, createRxDatabase, addRxPlugin } from 'rxdb'
import memoryAdapter from 'pouchdb-adapter-memory'
import BroadcastChannel from 'broadcast-channel'

import Search from '../Search'
import collectionCreatorFixture from '../__fixtures__/collection.fixture'
import data from '../__fixtures__'

const delay = (value: number) => new Promise(resolve =>
  setTimeout(() => resolve(), value)
)

describe('RxDB Search', () => {
  let db: RxDatabase
  let collection: RxCollection

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
      await db.addCollections({ naughties: collectionCreatorFixture })
      await delay(1000)
      collection = db.collections.naughties
      collection.searchFields.push('description')
    } catch (e) {
      console.error('could not make collection', e)
    }

  })

  describe('Plugin init', () => {
    beforeAll(async () => {
      await delay(1000)
    })

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
            data
              .filter((undefined, i) => i < 100)
              .map(async doc => await collection.insert(doc))
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

      describe('.index()', () => {
        test('indexes ALL (when no args)', async () => {
          try {
            await collection.index()
          } catch (e) {
            expect(e).toBeUndefined()
          }
        })

        test('indexes requested', async () => {
          const { success } = await collection.bulkInsert(
            data.filter((undefined, i) => i >= 100 && i < 200)
          )
          expect(success).toBeDefined()
          const ids = success.map((undefined, i) => success[i].get('_id'))
          await collection.index(ids)
          const word = data[105].description.split(' ')[1]

          const results = await collection.search(word)
          expect(results.length).toBeGreaterThan(0)
        })
      })
    })
  })

  afterAll(async () => {
    await db.destroy()
  })
})
