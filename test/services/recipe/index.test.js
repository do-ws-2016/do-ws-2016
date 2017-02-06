import app from '../../../src/app'

describe('recipe service', () => {
  it('registered the recipes service', () => {
    expect(app.service('recipes')).toBeDefined()
  })
})
