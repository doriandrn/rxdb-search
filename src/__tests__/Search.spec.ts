import { RxCollection, RxDatabase, createRxDatabase, addRxPlugin } from 'rxdb'
import memoryAdapter from 'pouchdb-adapter-memory'
import BroadcastChannel from 'broadcast-channel'

import Search from '../Search'
import collectionCreatorFixture from '../__fixtures__/collection.fixture'
import data from '../__fixtures__'
import { rmdir } from 'fs'

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
      await rmdir('./naughties', { recursive: true }, () => {})
      await delay(1000)
      await db.addCollections({ naughties: collectionCreatorFixture })
      await delay(1000)
      collection = db.collections.naughties
      // collection.searchFields.push('description')
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
      describe('facets', () => {
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
          const opts = {
            FACETS: ['description']
          }
          const r = await collection.search(`${dic[0]}`, opts)
          const r2 = await collection.search(lang, opts)

          expect(r.RESULT_LENGTH).toBeGreaterThan(0)
          expect(r2.RESULT_LENGTH).toEqual(0)
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
        const description = 'wtf yayo 22'
        const doc = await collection.insert({
          date: "2000/01/01",
          description,
          lang: "en",
        })
        const { _id } = doc
        await doc.remove()
        await db.requestIdlePromise()
        const { RESULT, RESULT_LENGTH } = await collection.search(description)

        expect(RESULT.map(r => r._id).indexOf(_id)).toEqual(-1)
        expect(RESULT_LENGTH).toEqual(0)
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

        expect(r.RESULT_LENGTH).toBeGreaterThan(0)
      })

      test('on update', async () => {
        const description = "blabla"
        const newDesc = 'xxx ooo bbb'
        const doc = await collection.insert(
          {
            date: "2000/01/01",
            description,
            lang: "en",
          })
        await doc.atomicSet('description', newDesc)
        await db.requestIdlePromise()
        const r = await collection.search(newDesc)

        expect(r.RESULT_LENGTH).toEqual(1)
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
        const { RESULT, RESULT_LENGTH } = await collection.search('10')
        expect( RESULT ).toBeDefined()
        expect( RESULT_LENGTH ).toBeGreaterThan(0)
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

          const { RESULT_LENGTH } = await collection.search(word)
          expect( RESULT_LENGTH ).toBeGreaterThan(0)
        })
      })
    })

    describe('multiple collections', () => {
      let col1, col2
      beforeAll(async () => {
        await rmdir('./n1', { recursive: true }, () => {})
        await rmdir('./n2', { recursive: true }, () => {})
        await db.addCollections({ n1: collectionCreatorFixture, n2: collectionCreatorFixture })
        await delay(1000)
        col1 = db.collections.n1
        col2 = db.collections.n2
      })

      test('return diferrent entries', async () => {
        await col1.insert({
          date: 'asdf',
          description: 'abgg test',
          lang: 'xo'
        })
        await col2.insert({
          date: '2021/21/21',
          description: 'abgg test',
          lang: 'bb'
        })

        const r1 = await col1.search('abgg test')
        expect(r1.RESULT_LENGTH).toEqual(1)
      })
    })
  })

  afterAll(async () => {
    await db.destroy()
  })
})
