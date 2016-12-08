import app from '../../../src/app';

describe('user service', () => {
  it('registered the users service', () => {
    expect(app.service('users')).toBeDefined();
  });
});
