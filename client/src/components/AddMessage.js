import React from 'react';
import { gql, graphql } from 'react-apollo';
import { channelDetailsQuery } from './ChannelDetails';
import { withRouter } from 'react-router';

const AddMessage = ({ mutate, match }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      mutate({
        variables: {
          message: {
            channelId: match.params.channelId,
            text: evt.target.value
          }
        },
        optimisticResponse: {
          addMessage: {
            id: Math.round(Math.random() * -100000),
            text: evt.target.value,
            __typename: 'Message',
          }
        },
        update: (store, {data: {addMessage}}) => {
          const data = store.readQuery({
            query: channelDetailsQuery,
            variables: {
              // when the query is used, we need to inject the params here as well as there
              id: match.params.channelId,
            }
          })

          data.channel.messages.push(addMessage)

          store.writeQuery({
            data,
            query: channelDetailsQuery,
            variables: {
              // when the query is used, we need to inject the params here as well as there
              id: match.params.channelId,
            }
          })
        }
      })
      evt.target.value = ''
    }
  };

  return (
    <div className="messageInput">
      <input
        type="text"
        placeholder="New message"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

const addMessageMutation = gql`
  mutation addMessageMutation($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`

const AddMessageWithMutation = graphql(addMessageMutation)(withRouter(AddMessage))

export default AddMessageWithMutation
