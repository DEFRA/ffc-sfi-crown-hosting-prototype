
const Joi = require('joi')

module.exports = [{
  method: 'GET',
  path: '/result',
  options: {
    validate: {
      query: Joi.object({
        headers: Joi.string().allow(''),
        payload: Joi.string().allow(''),
        error: Joi.string().allow('')
      }),
      failAction: async (request, h, error) => {
        return h.redirect('/url').takeover()
      }
    },
    handler: async (request, h) => {
      return h.view('result', { result: request.query })
    }
  }
}]
