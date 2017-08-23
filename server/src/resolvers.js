// the real data: can be inside a db collection, for instance
const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];

// the real core of GQL
// this is a custom resolver: the structure is the same defined inside schema.js
// when a query match this structure, it resolves it with the channels data
export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
  },
};