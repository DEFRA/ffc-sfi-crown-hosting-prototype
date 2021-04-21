const wreck = require('@hapi/wreck')

async function request (query) {
  return query.method === 'post' ? post(query.url, query.data, query.token) : get(query.url, query.token)
}

async function get (url, token) {
  try {
    const response = await wreck.get(url, getConfiguration(token))
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

function responseItemToString (item) {
  return JSON.stringify(item, undefined, 2)
}

module.exports = {
  get,
  post,
  request
}
