const isJson = require('../../app/utils/isJson')

describe('isJson', () => {
  test('returns true if json', () => {
    const result = isJson({ is: 'json' })
    expect(result).toBeTruthy()
  })

  test('returns false if not json', () => {
    const result = isJson('is not json')
    expect(result).toBeFalsy()
  })

  test('returns true if empty json', () => {
    const result = isJson({})
    expect(result).toBeTruthy()
  })

  test('returns true if json string', () => {
    const result = isJson('{"is":"json"}')
    expect(result).toBeTruthy()
  })
})
