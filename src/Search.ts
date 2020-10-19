import { RxCollection, RxDocument, RxDocumentBase } from 'rxdb';
import si from 'search-index'

export default {
  rxdb: true,

  prototypes: {
    RxCollection: (proto: RxCollection) => {
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
        console.info('Done indexing', this.name)
      }
    }
  },

  hooks: {
    createRxCollection: function (col: RxCollection) {
      const { name } = col
      col.si = si({ name })

      // Collection hooks on update and remove
      col.postRemove(({ _id }) => { col.si.DELETE([ _id ]) }, false)
      col.postSave((data) => { col.si.PUT([ { ...data } ]) }, false)
    },

    createRxDocument: async function (doc: RxDocumentBase<any>) {
      const { _data, collection: { si } } = doc
      if (si) await si.PUT([ {... _data } ])
    }
  }
}
