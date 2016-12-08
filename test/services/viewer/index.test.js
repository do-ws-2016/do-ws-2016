import app from '../../../src/app';

describe('viewer service', () => {
  it('registered the viewer service', () => {
    expect(app.service('viewer')).toBeDefined();
  });
});
