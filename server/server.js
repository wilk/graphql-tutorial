import express from 'express';
// express middlewares used to hook up graphql and graphiql to express
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
// body-parser used to parse json payloads
import bodyParser from 'body-parser';
import { schema } from './src/schema';

const PORT = 4000;

const server = express();

// endpoint to reach graphql
server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

// endpoint to reach graphiql
// it will forward the query to graphql, defined above
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
