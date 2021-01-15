import { addRxPlugin, createRxDatabase } from 'rxdb'
import memoryAdapter from 'pouchdb-adapter-memory'
import BroadcastChannel from 'broadcast-channel'
import Search from '../Search'

import collectionCreatorFixture from '../__fixtures__/collection.fixture'
import data from '../__fixtures__'

describe('Multiple collections', () => {
  let db, collections = [1], _collections,  searchTerm

  beforeAll(async () => {
    try {
      addRxPlugin(memoryAdapter)
      addRxPlugin(Search)
    } catch (e) {
      console.error('could not add adapter / plugin', e)
    }

    await BroadcastChannel.clearNodeFolder()

    db = await createRxDatabase({
      name: 'searchtestdb4',
      adapter: 'memory',
      ignoreDuplicate: true
    })

    _collections = await Promise.all(
      collections.map(async () => {
        const col = await db.collection(collectionCreatorFixture)
        col.searchFields.push('description')
        await Promise.all(
          data.slice(0, 3).map(async item => { console.log(item); await col.insert(item) })
        )

        return col
      })
    )

    await db.requestIdlePromise()
    searchTerm = data[2].description.split(' ')[2]
  })

  beforeEach(async () => {
    await db.requestIdlePromise()
  })

  afterAll(async () => {
    await db.destroy()
  })

  test('searches ok on one', async () => {
    const results = await _collections[0].search(searchTerm)
    expect(results.length).toBeGreaterThan(0)
  })

  // test('works ok', async () => {
  //   const results = {}
  //   await Promise.all(
  //     _collections.map(async (col, i) => {
  //       results[i] = await col.search(searchTerm)
  //       expect(results[i].length).toBeGreaterThan(0)
  //     })
  //   )
  //   expect(Object.keys(results).length).toEqual(collections.length)
  // })
})
