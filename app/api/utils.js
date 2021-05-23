const moment = require('moment')
const crypto = require('crypto')

function responseItemToString (item) {
  return JSON.stringify(item, undefined, 2)
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
  responseItemToString,
  getRelayToken
}
