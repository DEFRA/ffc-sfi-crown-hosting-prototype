const wreck = require('@hapi/wreck')
const { responseItemToString } = require('./utils')

async function get (url, token) {
  try {
    const response = await wreck.get(url, getConfiguration(token))
    return {
      headers: responseItemToString(response.res.headers),
      payload: responseItemToString(JSON.parse(response.payload.toString()))
    }
  } catch (error) {
    return {
      error: error.message
    }
  }
}

async function post (url, data, token) {
  try {
    const response = await wreck.post(url, {
      payload: data,
      ...getConfiguration(token)
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
  post
}
