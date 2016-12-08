const assert = require('assert');
const request = require('request');
const app = require('../../../src/app');

describe('graphql service', function() {
  before(function(done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('shows a 405 Method not allowed error', function(done) {
    request({
      url: 'http://localhost:3030/graphql',
      json: true,
    }, function(err, res, body) {
      assert.equal(res.statusCode, 405);
      done(err);
    });
  });
  describe('graphiql Editor', function() {
    it('shows a HTML page', function(done) {
      request({
        url: 'http://localhost:3030/graphiql',
        headers: {
          'Accept': 'text/html'
        }
      }, function(err, res, body) {
        assert.equal(res.statusCode, 200);
        assert.notEqual(body.indexOf('<title>GraphiQL</title>'), -1);
        done(err);
      });
    });
  });
});
