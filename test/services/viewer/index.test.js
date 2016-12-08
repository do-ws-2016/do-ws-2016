'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('viewer service', function() {
  it('registered the viewer service', () => {
    assert.ok(app.service('viewer'));
  });
});
