const https = require('hyco-https')
const { responseItemToString } = require('./utils')
const { hostname, keyRule, key } = require('../config').relay

async function get (path) {
  https.get({
    hostname: hostname,
    path: (!path || path.length === 0 || path[0] !== '/' ? '/' : '') + path,
    port: 443,
    headers: {
      ServiceBusAuthorization:
            https.createRelayToken(https.createRelayHttpsUri(hostname, path), keyRule, key)
    }
  }, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Request Failed.\n Status Code: ${res.statusCode}`)
      res.resume()
    } else {
      let payload
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`)
        payload += chunk
      })
      res.on('end', () => {
        console.log('No more data in response.')
        return {
          headers: responseItemToString(res.headers),
          payload: responseItemToString(payload)
        }
      })
    }
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`)
    return {
      error: e.message
    }
  })
}

module.exports = {
  get
}
