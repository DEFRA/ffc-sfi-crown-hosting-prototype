const ViewModel = require('./models/url')
const schema = require('./schemas/url')
const { cookieOptions } = require('../config')

module.exports = [{
  method: 'GET',
  path: '/',
  options: {
    handler: (request, h) => {
      const values = request.state.ffc_sfi_chp || {}
      return h.view('home', new ViewModel(values.url))
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
        return h.view('home', new ViewModel(request.payload.url, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect(`/result?url=${request.payload.url}`).state('ffc_sfi_chp', request.payload, cookieOptions)
    }
  }
}]
