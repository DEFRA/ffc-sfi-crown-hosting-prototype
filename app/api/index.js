const wreck = require('@hapi/wreck')

async function request (method, url, data, token) {
  return method === 'post' ? post(url, data, token) : get(url, token)
}

async function get (url, token) {
  const response = await wreck.get(url, getConfiguration(token))
  return {
    headers: response.res.headers,
    payload: response.payload
  }
}

async function post (url, data, token) {
  const response = await wreck.post(url, {
    payload: data,
    ...getConfiguration(token)
  })
  return {
    headers: response.res.headers,
    payload: response.payload
  }
}

function getConfiguration (token) {
  return {
    headers: {
      Authorization: token || ''
    },
    json: true
  }
}

module.exports = {
  get,
  post,
  request
}
