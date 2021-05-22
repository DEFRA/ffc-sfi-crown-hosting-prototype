const { get, post } = require('./standard')
const moment = require('moment')
const crypto = require('crypto')

async function request (query) {
  if (query.relay && query.relayKey) {
    query.token = getRelayToken(query.relayNamespace, query.relayKeyName, query.relayKey)
  }
  return query.method === 'post' ? post(query.url, query.data, query.token) : get(query.url, query.token)
}

function getRelayToken (relayNamespace, relayKeyName, relayKey) {
  const uri = `https://${relayNamespace}/`
  const unixSeconds = moment().add(3600, 'seconds').unix()
  const toSign = encodeURIComponent(uri) + '\n' + unixSeconds
  const hmac = crypto.createHmac('sha256', relayKey)
  hmac.update(toSign)
  const signature = hmac.digest('base64')
  const token = 'SharedAccessSignature sr=' + encodeURIComponent(uri) + '&sig=' + encodeURIComponent(signature) + '&se=' + unixSeconds + '&skn=' + relayKeyName
  return token
}

module.exports = {
  request
}
