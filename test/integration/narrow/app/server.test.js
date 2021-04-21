describe('Server test', () => {
  let server

  beforeEach(() => {
    jest.resetModules()
  })

  test('createServer returns server', () => {
    server = require('../../../../app/server')
    expect(server).toBeDefined()
  })
})
