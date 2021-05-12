const { get, post } = require('./standard')
const { get: getRelay } = require('./relay')

async function request (query) {
  if (query.relay) {
    return getRelay(query.url)
  }
  return query.method === 'post' ? post(query.url, query.data, query.token) : get(query.url, query.token)
}

module.exports = {
  request
}
