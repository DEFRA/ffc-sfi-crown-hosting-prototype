function isJson (item) {
  item = typeof item !== 'string'
    ? JSON.stringify(item)
    : item

  try {
    item = JSON.parse(item)
  } catch {
    return false
  }

  return typeof item === 'object' && item !== null
}

module.exports = isJson
