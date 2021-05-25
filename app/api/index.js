const { get, post } = require('./http')
// const { get: getRelayHttp } = require('./relay-http')
// const { get: getRelaySocket } = require('./relay-socket')
const { getRelayToken } = require('./utils')

async function request (query) {
  if (query.relay && query.relayKey) {
    query.token = getRelayToken(query.relayNamespace, query.relayKeyName, query.relayKey)
  }
  // if (query.relay) {
  //   return getRelaySocket(query)
  // }
  return query.method === 'post' ? post(query.url, query.data, query.token) : get(query.url, query.token)
}

module.exports = {
  request
}
