const schema = require('./schemas/url')
const api = require('../api')

module.exports = [{
  method: 'GET',
  path: '/result',
  options: {
    validate: {
      query: schema,
      failAction: async (request, h, error) => {
        return h.redirect('/url').takeover()
      }
    },
    handler: async (request, h) => {
      const { headers, payload } = await api.request(request.query)
      return h.view('result', { headers: JSON.stringify(headers, undefined, 2), payload: JSON.stringify(payload, undefined, 2) })
    }
  }
}]
