const { get, post } = require('./http')
const { getRelayToken } = require('./utils')
const { chApiGateway, chApiId, chApiKey } = require('../config')

async function request (query) {
  if (query.relay && query.relayKey) {
    query.token = getRelayToken(query.relayNamespace, query.relayKeyName, query.relayKey)
  }

  const headers = {
    'api-id': query.api_id || chApiId,
    'api-key': query.api_key || chApiKey,
    callerid: query.callerid
  }

  const fullUrl = getFullUrl(query.url)

  return query.method === 'post'
    ? post(fullUrl, query.data, query.token, headers)
    : get(fullUrl, query.token, headers)
}

function getFullUrl (path) {
  // remove any leading slashes and prefix with API Gateway
  return `${chApiGateway}/${path.replace(/^\/+/, '')}`
}

module.exports = {
  request
}
