let nextId = 3

const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];


export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
  },
  // the server holds the query and mutation resolvers definitions
  Mutation: {
    // this is a custom resolver for the addChannel mutation
    // it does exactly what is define inside the mutation definition
    // accepting a name arg and then return a new channel
    addChannel: (root, args) => {
      const channel = {
        id: nextId++,
        name: args.name
      }

      channels.push(channel)

      return channel
    }
  }
};
