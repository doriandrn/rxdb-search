import { RxCollection, RxDatabase, RxDocument, RxDocumentBase } from 'rxdb';
import si from 'search-index'

export default {
  rxdb: true,

  prototypes: {
    RxCollection: (proto) => {
      proto.search = async function (input ?: string) {
        try {
          return await this.si.SEARCH(...(input.split(' ')))
        } catch (e) {
          console.error('Error while searching: ', e)
        }
      }

      proto.index = async function () {
        const data = await this.find().exec()
        this.si.PUT(data.map((doc: RxDocument) => doc._data))
      }
    }
  },

  hooks: {
    createRxCollection: function (col: RxCollection) {
      const { name } = col
      col.si = si({ name })
    },

    createRxDocument: function (doc: RxDocumentBase<any>) {
      const { _data, collection } = doc
      try {
        collection.si.PUT([ {... _data } ])
      } catch (e) {
        console.error('Could not PUT', _data, e)
      }
    }
  }
}
