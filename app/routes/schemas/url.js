const Joi = require('joi')

module.exports = Joi.object({
  url: Joi.string().uri(),
  method: Joi.string().valid('get', 'post').default('get'),
  data: Joi.string().allow(''),
  token: Joi.string().allow('')
})
