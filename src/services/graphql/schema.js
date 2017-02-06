import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './typeDefs'
import getResolvers from './resolvers'
export default (app) => makeExecutableSchema({ typeDefs, resolvers: getResolvers.call(app) })
