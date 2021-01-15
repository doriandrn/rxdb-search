import { RxCollection, RxDocument } from 'rxdb
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
      proto.search = async function (input : string, opts = { FACETS: proto.searchFields || [] }) {
        try {
          return await this.si.QUERY([...(input.split(' '))], opts)
        } catch (e) {
          console.error('Error while searching: ', e)
        } finally {
          return []
        }
      }

      proto.index = async function (requestedDocs ?: string[]) {
        const { PUT } = this.si
        let data = requestedDocs && requestedDocs.length ?
          Array.from((await this.findByIds(requestedDocs)).values()) :
          await this.find().exec()

        await PUT(data.map((doc: RxDocument) => doc._data))
        console.info(`Done indexing ${ data.length } documents on "${ this.name }"`)
      }

      proto.$si = async function (opts = {}) {
        const { name } = this
        proto.si = await si({ name, ...opts })
      }
    }
  },

  hooks: {
    createRxCollection: async function (col: RxCollection) {
      await col.$si()

      if (!col.searchFields)
        col.searchFields = []

      const { si, searchFields, schema: { primaryPath } } = col

      col.postRemove( ({ _id }) => { si.DELETE([ _id ]) }, false )
      col.postSave( (data) => { si.PUT([ filter(data, [ primaryPath, ...searchFields ]) ]) }, false )
      col.postInsert( (data) => { si.PUT([ filter(data, [ primaryPath, ...searchFields ]) ]) }, false )
    }
  }
}
