import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
scalar JSON

type Item {
  id: ID!
  data: JSON
}

input ItemInput {
  data: JSON
}

# this is used as a struct to pass to the mutation function signature
# instead of having a list of params that can grow over time
input MessageInput {
  channelId: ID!
  text: String
}

type Message {
  id: ID!
  text: String
}
type Channel {
  id: ID!                # "!" denotes a required field
  name: String
  messages: [Message]!
}
# This type specifies the entry points into our API
type Query {
  channels: [Channel]    # "[]" means this is a list of channels
  channel(id: ID!): Channel
  items: [Item]
  item(id: ID!): Item
}

# The mutation root type, used to define all mutations
type Mutation {
  addChannel(name: String!): Channel
  addMessage(message: MessageInput!): Message
  addItem(item: ItemInput!): Item
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
