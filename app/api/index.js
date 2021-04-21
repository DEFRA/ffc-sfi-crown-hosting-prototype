const wreck = require('@hapi/wreck')

async function request (query) {
  return query.method === 'post' ? post(query.url, query.data, query.token) : get(query.url, query.token)
}

async function get (url, token) {
  try {
    const response = await wreck.get(url, getConfiguration(token))
    return {
      headers: response.res.headers,
      payload: response.payload
    }
  } catch (error) {
    return {
      headers: {},
      payload: {},
      error
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
      headers: response.res.headers,
      payload: response.payload
    }
  } catch (error) {
    return {
      headers: {},
      payload: {},
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
  post,
  request
}
