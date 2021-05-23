const WebSocket = require('hyco-ws')
const { responseItemToString } = require('./utils')

async function get (query) {
  return new Promise((resolve) => {
    const uri = WebSocket.createRelayListenUri(query.relayNamespace, query.url)
    const wss = WebSocket.RelayedServer({
      server: uri,
      token: WebSocket.createRelayToken(uri, query.relayKeyName, query.relayKey)
    },
    function (ws) {
      ws.on('connection', function (ws) {
        console.log('connection accepted')
        ws.onmessage = function (event) {
          const data = JSON.parse(event.data)
          resolve({
            headers: {},
            payload: responseItemToString(data)
          })
        }
      })
    })
    wss.on('error', function (err) {
      console.error(`Got error: ${err}`)
      wss.close()
      resolve({
        error: err
      })
    })
  })
}

module.exports = {
  get
}
