const buildQueryString = require('../../app/utils/build-query-string')

describe('buildQueryStringFromObject', () => {
  test('returns query string', () => {
    const obj = {
      bps2021Value: 10,
      bps2022Value: 20,
      bps2023Value: 30,
      bps2024Value: 40
    }

    const result = buildQueryString(obj)
    expect(result).toBe('bps2021Value=10&bps2022Value=20&bps2023Value=30&bps2024Value=40')
  })

  test('returns ignores undefined values', () => {
    const obj = {
      bps2021Value: 10,
      bps2022Value: 20,
      bps2023Value: 30,
      bps2024Value: undefined
    }

    const result = buildQueryString(obj)
    expect(result).toBe('bps2021Value=10&bps2022Value=20&bps2023Value=30')
  })

  test('returns ignores null values', () => {
    const obj = {
      bps2021Value: 10,
      bps2022Value: 20,
      bps2023Value: 30,
      bps2024Value: null
    }

    const result = buildQueryString(obj)
    expect(result).toBe('bps2021Value=10&bps2022Value=20&bps2023Value=30')
  })

  test('returns empty string if empty object', () => {
    const obj = {}

    const result = buildQueryString(obj)
    expect(result).toBe('')
  })
})
