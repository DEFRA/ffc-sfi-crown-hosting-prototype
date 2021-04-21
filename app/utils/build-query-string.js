module.exports = function buildQueryStringFromObject (obj) {
  const queryString = []
  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property) && obj[property]) {
      queryString.push(`${encodeURIComponent(property)}=${encodeURIComponent(obj[property])}`)
    }
  }
  return queryString.join('&')
}
