import React from 'react';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';
import NotFound from './NotFound';

import {
    gql,
    graphql,
} from 'react-apollo';

const ChannelDetails = ({data: {loading, error, channel}, match}) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if(channel === null){
    return <NotFound />
  }

  return (
    <div>
      <div className="channelName">
        {channel.name}
      </div>
      <MessageList messages={channel.messages}/>
    </div>);
}

// this is a query with params
export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($id: ID!) {
    channel(id: $id) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`

const ChannelDetailWithQuery = graphql(channelDetailsQuery, {
  options: (props) => ({
    // and here we're injecting the param id inside the query
    // by accessing the component's props
    variables: { id: props.match.params.channelId },
  })
})(ChannelDetails)

export default ChannelDetailWithQuery;
