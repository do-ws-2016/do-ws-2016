import fetch from 'node-fetch'

module.exports = function (username, password) {
  const app = this
  const baseUrl = `http://${app.get('host')}:${app.get('port')}`
  const body = { username, password }
  return fetch(baseUrl + '/auth/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((res) => res.json())
}
