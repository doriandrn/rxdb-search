import { RxCollection, RxDocument } from 'rxdb'
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
      proto.search = function (input : string, opts = { FACETS: proto.searchFields || [] }) {
        return this.si.QUERY
          .apply(si.QUERY, [{ AND: [...(input.split(' '))] }, opts])
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
    createRxCollection: async (col: RxCollection) => {
      await col.$si()

      if (!col.searchFields)
        col.searchFields = []

      const { searchFields, schema: { primaryPath } } = col

      col.postRemove(async ({ _id }) => { await col.si.DELETE([ _id ]) }, false )
      col.postSave( (data) => { col.si.PUT([ filter(data, [ primaryPath, ...searchFields ]) ]) }, false )
      col.postInsert( (data) => { col.si.PUT([ filter(data, [ primaryPath, ...searchFields ]) ]) }, false )
    }
  }
}
