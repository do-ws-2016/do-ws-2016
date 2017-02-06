import app from '../../../src/app'

describe('cookbook service', () => {
  it('registered the cookbooks service', () => {
    expect(app.service('cookbooks')).toBeDefined()
  })
})
