import { PubSub } from 'graphql-subscriptions';
import { withFilter } from 'graphql-subscriptions';

const channels = [{
  id: '1',
  name: 'soccer',
  messages: [{
    id: '1',
    text: 'soccer is football',
  }, {
    id: '2',
    text: 'hello soccer world cup',
  }, {
    id: '3',
    text: 'text3'
  }, {
    id: '4',
    text: 'text4'
  }, {
    id: '5',
    text: 'text5'
  }, {
    id: '6',
    text: 'text6'
  }, {
    id: '7',
    text: 'text7'
  }, {
    id: '8',
    text: 'text8'
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
}, {
id: '3',
  name: 'basektball',
  messages: [{
    id: '5',
    text: 'basketball is life',
  }, {
    id: '6',
    text: 'hello basketball NBA finals',
  }]
}, {
id: '4',
  name: 'tennis',
  messages: [{
    id: '7',
    text: 'tennis is life',
  }, {
    id: '8',
    text: 'hello US Open',
  }]
}];
let nextId = 5;
let nextMessageId = 9;

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    channels: (root, args) => {
      return channels;
    },
    //channel: (root, { id }, { cursor }) => {
    channel: (root, args) => {
      let { id, cursor } = args;
      let channel = channels.find(channel => channel.id === id);
      console.log('og channel: ', channel);
      let messages = channel.messages.slice(cursor-2, cursor);
      console.log('messages: ', messages);
      messages.cursor = cursor-2;
      channel.messages = messages;
      //console.log('channel: ', channel);
      return channel;
    },
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: String(nextId++), messages: [], name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, { message }) => {
      const channel = channels.find(channel => channel.id === message.channelId);
      if(!channel)
        throw new Error("Channel does not exist");

      const newMessage = { id: String(nextMessageId++), text: message.text };
      channel.messages.push(newMessage);

      pubsub.publish('messageAdded', { messageAdded: newMessage, channelId: message.channelId });

      return newMessage;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator('messageAdded'), (payload, variables) => {
        // The `messageAdded` channel includes events for all channels, so we filter to only
        // pass through events for the channel specified in the query
        return payload.channelId === variables.channelId;
      }),
    }
  },
};
