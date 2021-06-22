const { get, post } = require('./http')
const { getRelayToken } = require('./utils')

async function request (query) {
  if (query.relay && query.relayKey) {
    query.token = getRelayToken(query.relayNamespace, query.relayKeyName, query.relayKey)
  }

  const headers = {
    api_id: query.api_id,
    api_key: query.api_key
  }

  return query.method === 'post'
    ? post(query.url, query.data, query.token, headers)
    : get(query.url, query.token, headers)
}

module.exports = {
  request
}
