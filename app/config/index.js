module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  serviceName: 'Test my Crown Hosting API',
  staticCacheTimeoutMillis: 7 * 24 * 60 * 60 * 1000,
  cookieOptions: {
    ttl: 1000 * 60 * 60 * 24 * 30,
    encoding: 'base64json',
    isSecure: process.env.NODE_ENV === 'production',
    isHttpOnly: true,
    clearInvalid: false,
    strictHeader: true
  },
  relay: {
    hostname: process.env.RELAY_NAMESPACE,
    keyRule: process.env.RELAY_KEY_RULE,
    key: process.env.RELAY_KEY
  }
}
