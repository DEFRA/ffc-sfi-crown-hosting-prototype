const https = require('hyco-https')
const { responseItemToString } = require('./utils')

async function get (query) {
  return new Promise((resolve) => {
    https.get({
      hostname: query.relayNamespace,
      path: (!query.url || query.url.length === 0 || query.url[0] !== '/' ? '/' : '') + query.url,
      port: 443,
      headers: {
        ServiceBusAuthorization: https.createRelayToken(https.createRelayHttpsUri(query.relayNamespace, query.url), query.relayKeyName, query.relayKey)
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Request Failed. Status Code: ${res.statusCode}`)
        res.resume()
        resolve({
          error: `Request Failed. Status Code: ${res.statusCode}, Message: ${res.statusMessage}`
        })
      } else {
        let data
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`)
          data += chunk
        })
        res.on('end', () => {
          console.log('No more data in response.')
          resolve({
            headers: responseItemToString(res.headers),
            payload: responseItemToString(data)
          })
        })
      }
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`)
      resolve({
        error: e.message
      })
    })
  })
}

module.exports = {
  get
}
