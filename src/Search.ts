import { RxDatabase, RxDocumentBase } from 'rxdb';
import si from 'search-index'
let idb

const rxdbSearch = {
  rxdb: true,

  /**
   * every value in this object can manipulate the prototype of the keynames class
   * You can manipulate every prototype in this list:
   * @link https://github.com/pubkey/rxdb/blob/master/src/plugin.ts#L22
   */
  prototypes: {
    /**
     * add a function to RxCollection so you can call 'myCollection.hello()'
     *
     * @param {object} prototype of RxCollection
     */
    RxCollection: (proto) => {
      proto.search = async function (input ?: string) {
        if (!idb)
          throw new Error('IDB is not defined')

        try {
          return await idb.SEARCH(...(input.split(' ')))
        } catch (e) {
          console.error('Error while searching: ', e)
        }
      }
    }
  },

  hooks: {
      createRxDatabase: function (db: RxDatabase) {
        const { name } = db
        idb = si({ name })
        Object.assign(db, { idb })
      },
      /**
       * add a foo-property to each document. You can then call myDocument.foo (='bar')
       */
      createRxDocument: function (doc: RxDocumentBase<any>) {
        if (!idb) return
        const { _data } = doc
        try {
          idb.PUT([ {... _data } ])
        } catch (e) {
          console.error('Could not PUT', _data, e)
        }
      }

  }
};

export default rxdbSearch

// now you can import the plugin into rxdb
// addRxPlugin(myPlugin);
