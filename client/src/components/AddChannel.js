import React from 'react';
import { gql, graphql } from 'react-apollo';

import { channelsListQuery } from './ChannelsListWithData';

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate({ 
        variables: { name: evt.target.value },
        // this will update the store with new data
        // before getting the answer from the server
        // only if optimisticResponse is defined
        update: (store, {data: {addChannel}}) => {
          // this data is read from the cache
          const data = store.readQuery({query: channelsListQuery})

          // addChannel is the new channel retrieved from the mutation addChannel
          data.channels.push(addChannel)

          // write back to the cache the new dataset
          store.writeQuery({query: channelsListQuery, data})
        },
        // this is what we expect from the server response
        optimisticResponse: {
          addChannel: {
            name: evt.target.value,
            id: Math.floor(Math.random() * -10000),
            __typename: 'Channel'
          }
        }
        //refetchQueries: [ { query: channelsListQuery }],
      })
      evt.target.value = '';
    }
  };

  return (
    <input
      type="text"
      placeholder="New channel"
      onKeyUp={handleKeyUp}
    />
  );
};

const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;


const AddChannelWithMutation = graphql(
  addChannelMutation,
)(AddChannel);

export default AddChannelWithMutation;