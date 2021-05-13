const https = require('hyco-https')
const { responseItemToString } = require('./utils')
const { hostname, keyRule, key } = require('../config').relay

async function get (path) {
  return new Promise((resolve) => {
    https.get({
      hostname: hostname,
      path: (!path || path.length === 0 || path[0] !== '/' ? '/' : '') + path,
      port: 443,
      headers: {
        ServiceBusAuthorization: https.createRelayToken(https.createRelayHttpsUri(hostname, path), keyRule, key)
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Request Failed. Status Code: ${res.statusCode}`)
        res.resume()
        resolve({
          error: `Request Failed. Status Code: ${res.statusCode}`
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
