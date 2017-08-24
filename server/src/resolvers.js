import GraphQLJSON from 'graphql-type-json'

const items = [{
  id: 0,
  data: {
    text: 'hey dude',
    author: {
      name: 'watter',
      surname: 'meh'
    },
    people: [{
      id: 0,
      badge: '0x0222'
    }, {
      id: 1,
      badge: '0x0223'
    }, {
      id: 2,
      badge: '0x0224'
    }]
  }
}, {
  id: 1,
  data: {
    form: 'that\'s a form',
    fields: [{
      name: 'Issue',
      type: 'text',
      value: 'wat'
    }, {
      name: 'Id',
      type: 'number',
      value: 0
    }]
  }
}]

const channels = [{
  id: '1',
  name: 'soccer',
  messages: [{
    id: '1',
    text: 'soccer is football',
  }, {
    id: '2',
    text: 'hello soccer world cup',
  }]
}, {
  id: '2',
  name: 'baseball',
  messages: [{
    id: '3',
    text: 'baseball is life',
  }, {
    id: '4',
    text: 'hello baseball world series',
  }]
}]
let nextId = 3;
let nextMessageId = 5;

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, args) => channels.find(ch => ch.id === args.id),
    items: _ => items,
    item: (root, args) => items.find(i => i.id === args.id)
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: String(nextId++), messages: [], name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: async (root, args) => {
      // this is a resolver of a mutation with args (channelId)
      const newMessage = { id: String(nextMessageId++), text: args.message.text },
        channel = channels.find(ch => ch.id === args.message.channelId)

      if (!channel) throw new Error('Channel does\'nt exist')

      channel.messages.push(newMessage)

      return await new Promise(r => setTimeout(_ => r(newMessage), 3000))

      //return newMessage
    },
    addItem: async (root, args) => {
      console.log(args.item.data)
      const newItem = { id: String(items.length), data: args.item.data }
      items.push(newItem)
      return newItem
    }
  },
};
