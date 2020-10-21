import { RxCollection, RxDocument } from 'rxdb';
import si from 'search-index'

const filter = (raw: object, allowed: string[]) => {
  if (allowed.length <= 1)
    return { ... raw }

  return Object.keys(raw)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      return { ...obj, [key]: raw[key] };
    }, {});
}

export default {
  rxdb: true,

  prototypes: {
    RxCollection: (proto: RxCollection) => {
      proto.search = async function (input : string) {
        try {
          return await this.si.SEARCH(...(input.split(' ')))
        } catch (e) {
          console.error('Error while searching: ', e)
        }
      }

      proto.index = async function (requestedDocs ?: string[]) {
        let data = requestedDocs && requestedDocs.length ?
          Array.from((await this.findByIds(requestedDocs)).values()) :
          await this.find().exec()

        await this.si.PUT(data.map((doc: RxDocument) => doc._data))
        console.info(`Done indexing ${ data.length } documents on "${ this.name }"`)
      }
    }
  },

  hooks: {
    createRxCollection: function (col: RxCollection) {
      if (!col.searchFields)
        col.searchFields = []

      const { name, searchFields, schema: { primaryPath } } = col

      col.si = si({ name })
      col.postRemove( ({ _id }) => { col.si.DELETE([ _id ]) }, false )
      col.postSave( (data) => { col.si.PUT([ filter(data, [ primaryPath, ...searchFields ]) ]) }, false )
      col.postInsert( (data) => { col.si.PUT([ filter(data, [ primaryPath, ...searchFields ]) ]) }, false )
    }
  }
}
