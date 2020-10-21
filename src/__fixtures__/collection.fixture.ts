const date = new Date()
const type = 'string'

/**
 * Data provided by
 * https://github.com/fergiemcdowall/search-index/blob/master/test/data/naughties.json
 */
export default {
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
