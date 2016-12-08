import fetch from 'node-fetch';
import server from '../src/server';

describe('Feathers application tests', () => {
  let connection;
  beforeAll(() => {
    connection = server(3030);
  });
  afterAll(() => {
    connection.close();
  });
  pit('starts and shows the index page', () => {
    return fetch('http://localhost:3030/', {
      headers: {
        'Accept': 'text/html'
      },
    })
      .then((res) => {
        expect(res.status).toEqual(200)
        return res.text();
      })
      .then((body) => {
        expect(body).toMatchSnapshot();
      })
  });
  describe('404', () => {
    pit('shows a 404 HTML page', () => {
      return fetch('http://localhost:3030/path/to/nowhere', {
        headers: {
          'Accept': 'text/html'
        },
      })
        .then((res) => {
          expect(res.status).toEqual(404)
          return res.text();
        })
        .then((body) => {
          expect(body).toMatchSnapshot();
        })
    });

    pit('shows a 404 JSON error without stack trace', () => {
      return fetch('http://localhost:3030/path/to/nowhere')
        .then((res) => {
          expect(res.status).toEqual(404)
          return res.json();
        })
        .then((body) => {
          expect(body).toMatchSnapshot();
        })
    });
  });
});
