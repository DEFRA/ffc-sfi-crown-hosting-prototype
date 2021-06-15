const { get, post } = require('./http')
const { getRelayToken } = require('./utils')

async function request (query) {
  if (query.relay && query.relayKey) {
    query.token = getRelayToken(query.relayNamespace, query.relayKeyName, query.relayKey)
  }
  return query.method === 'post' ? post(query.url, query.data, query.token) : get(query.url, query.token)
}

module.exports = {
  request
}
