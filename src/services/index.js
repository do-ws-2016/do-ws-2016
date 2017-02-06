import cookbook from './cookbook'
import recipe from './recipe'
import viewer from './viewer'
import graphql from './graphql'
import authentication from './authentication'
import user from './user'

module.exports = function () {
  const app = this
  app.configure(authentication)
  app.configure(user)
  app.configure(viewer)
  app.configure(recipe)
  app.configure(cookbook)
  app.configure(graphql)
}
