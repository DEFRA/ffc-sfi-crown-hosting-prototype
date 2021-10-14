const Joi = require('joi')

const custom = Joi.extend((joi) => {
  return {
    type: 'object',
    base: joi.object(),
    coerce (value, schema) {
      if (value[0] !== '{' &&
        !/^\s*\{/.test(value)) {
        return
      }

      try {
        return { value: JSON.parse(value) }
      } catch (err) {
        console.log(err)
      }
    }
  }
})

module.exports = Joi.object({
  url: Joi.string(),
  method: Joi.string().valid('get', 'post').default('get'),
  callerid: Joi.string().allow(''),
  api_id: Joi.string().allow(''),
  api_key: Joi.string().allow(''),
  relay: Joi.boolean().default(true),
  data: custom.object().allow(null, ''),
  token: Joi.string().allow(''),
  relayNamespace: Joi.string().allow(''),
  relayKeyName: Joi.string().allow(''),
  relayKey: Joi.string().allow('')
})
