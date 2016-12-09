// @flow
import hooks from './hooks';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import getSchema from './schema';

module.exports = function(){
  const app = this;
  const schema = getSchema(app);
  app.use('/graphql',
    graphqlExpress((req) => {
      const {token, provider} = req.feathers;
      return {
        debug: false,
        schema,
        context: {
          token,
          provider
        },
        formatError: error => {
          const path = error.path.join(' ▸ ')
          app.logger.clog("warn",
            `GRAPQL-${error.originalError.name}-${error.originalError.code}`,
            error.message,
            "\n ↪ Path: " + path
          );
          return {
            name: error.originalError.name,
            code: error.originalError.code,
            message: error.message,
            locations: error.locations,
            path: path
          };
        }
      }
    })
  )
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
};
