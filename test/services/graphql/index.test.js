import fetch from 'node-fetch'
import server from '../../../src/server'

describe('graphql service', () => {
  let connection
  beforeAll(() => {
    connection = server(3030)
  })
  afterAll(() => {
    connection.close()
  })
  it('shows a 405 Method not allowed error', () => {
    return fetch('http://localhost:3030/graphql')
      .then((res) => {
        expect(res.status).toEqual(405)
        return res.text()
      })
      .then((body) => {
        expect(body).toMatchSnapshot()
      })
  })

  it('shows the graphiql Editor', () => {
    return fetch('http://localhost:3030/graphiql')
      .then((res) => {
        expect(res.status).toEqual(200)
        return res.text()
      })
      .then((body) => {
        expect(body).toMatchSnapshot()
      })
  })
})
