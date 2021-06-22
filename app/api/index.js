const { get, post } = require('./http')
const { getRelayToken } = require('./utils')
const { chApiId, chApiKey } = require('../config')

async function request (query) {
  if (query.relay && query.relayKey) {
    query.token = getRelayToken(query.relayNamespace, query.relayKeyName, query.relayKey)
  }

  const headers = {
    'api-id': query.api_id || chApiId,
    'api-key': query.api_key || chApiKey
  }

  return query.method === 'post'
    ? post(query.url, query.data, query.token, headers)
    : get(query.url, query.token, headers)
}

module.exports = {
  request
}
