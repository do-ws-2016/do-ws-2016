// @flow
import hooks from './hooks';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import getSchema from './schema';

module.exports = function(){
  const app = this;
  const schema = getSchema(app);
  app.use('/graphql',bodyParser.json(), graphqlExpress((req) => {
    const {token, provider} = req.feathers;
    return {
      schema,
      context: {
        token,
        provider
      }
    }
  }));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
};
