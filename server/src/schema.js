import {
  // this will make the schema executable
  // it means that we can add custom resolvers to it
  makeExecutableSchema,

  // this is used to generate mocks up
  //addMockFunctionsToSchema,
} from 'graphql-tools';
import {resolvers} from './resolvers'
const typeDefs = `
type Channel {
   id: ID!                # "!" denotes a required field
   name: String
}
# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   channels: [Channel]    # "[]" means this is a list of channels
}
`;

// now schema is executable with our custom resolvers
const schema = makeExecutableSchema({ typeDefs, resolvers });

// this let the schema to generate mocks up
//addMockFunctionsToSchema({ schema });

export { schema };