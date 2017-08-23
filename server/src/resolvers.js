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
}];
let nextId = 3;
let nextMessageId = 5;

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, args) => channels.find(ch => ch.id === args.id)
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: String(nextId++), messages: [], name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, args) => {
      // this is a resolver of a mutation with args (channelId)
      const newMessage = { id: String(nextMessageId++), text: args.message.text },
        channel = channels.find(ch => ch.id === args.message.channelId)

      if (!channel) throw new Error('Channel does\'nt exist')

      channel.messages.push(newMessage)

      return newMessage
    }
  },
};
