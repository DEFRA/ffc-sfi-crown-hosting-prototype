const schema = require('../../app/routes/schemas/url')

describe('Url schema validation', () => {
  test('is valid for Url only', () => {
    const result = schema.validate({ url: 'http://mytest.com' })
    expect(result.error).toBeUndefined()
  })

  test('is invalid for invalid Url only', () => {
    const result = schema.validate({ url: 'mytest.com' })
    expect(result.error).toBeDefined()
  })

  test('is valid for Url and get', () => {
    const result = schema.validate({ url: 'http://mytest.com', method: 'get' })
    expect(result.error).toBeUndefined()
  })

  test('is valid for Url and post', () => {
    const result = schema.validate({ url: 'http://mytest.com', method: 'post' })
    expect(result.error).toBeUndefined()
  })

  test('is invalid for invalid method', () => {
    const result = schema.validate({ url: 'http://mytest.com', method: 'put' })
    expect(result.error).toBeDefined()
  })

  test('is valid with token', () => {
    const result = schema.validate({ url: 'http://mytest.com', token: 'myToken' })
    expect(result.error).toBeUndefined()
  })

  test('is valid with data', () => {
    const result = schema.validate({ url: 'http://mytest.com', data: '{"my":"Data"}' })
    expect(result.error).toBeUndefined()
  })
})
