'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('cookbook service', function() {
  it('registered the cookbooks service', () => {
    assert.ok(app.service('cookbooks'));
  });
});
