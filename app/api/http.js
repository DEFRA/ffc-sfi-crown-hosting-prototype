const wreck = require('@hapi/wreck')
const { responseItemToString } = require('./utils')

async function get (url, token, headers) {
  try {
    const response = await wreck.get(url, getConfiguration(token, headers))
    return {
      headers: responseItemToString(response.res.headers),
      payload: responseItemToString(response.payload)
    }
  } catch (error) {
    return {
      error: error.message
    }
  }
}

async function post (url, data, token, headers) {
  try {
    const response = await wreck.post(url, {
      payload: data,
      ...getConfiguration(token, headers)
    })

    return {
      headers: responseItemToString(response.res.headers),
      payload: responseItemToString(response.payload)
    }
  } catch (error) {
    return {
      error: error.message
    }
  }
}

function getConfiguration (token, headers = {}) {
  return {
    headers: {
      ...headers,
      Authorization: token || ''
    },
    rejectUnauthorized: false,
    json: true
  }
}

module.exports = {
  get,
  post
}
