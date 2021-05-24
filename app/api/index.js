const { get, post } = require('./standard')
const { get: getRelay } = require('./relay-http')
const { getRelayToken } = require('./utils')

async function request (query) {
  if (query.relay && query.relayKey) {
    query.token = getRelayToken(query.relayNamespace, query.relayKeyName, query.relayKey)
  }
  // if (query.relay) {
  //   return getRelay(query)
  // }
  return query.method === 'post' ? post(query.url, query.data, query.token) : get(query.url, query.token)
}

module.exports = {
  request
}
