const ViewModel = require('./models/url')
const schema = require('./schemas/url')
const { cookieOptions } = require('../config')
const buildQueryString = require('../utils/build-query-string')

module.exports = [{
  method: 'GET',
  path: '/',
  options: {
    handler: (request, h) => {
      const values = request.state.ffc_sfi_chp || {}
      return h.view('home', new ViewModel(values))
    }
  }
},
{
  method: 'POST',
  path: '/',
  options: {
    validate: {
      payload: schema,
      failAction: async (request, h, error) => {
        return h.view('home', new ViewModel(request.payload, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const queryString = buildQueryString(request.payload)
      return h.redirect(`/result?${queryString}`).state('ffc_sfi_chp', request.payload, cookieOptions)
    }
  }
}]
