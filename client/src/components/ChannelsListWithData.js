import React from 'react';
import {
  Link
} from 'react-router-dom'

import {
    gql,
    graphql,
} from 'react-apollo';

import AddChannel from './AddChannel';

const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="channelsList">
      <AddChannel />
      { channels.map( ch =>
        (<div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>
          <Link to={ch.id < 0 ? `/` : `channel/${ch.id}`}>
            {ch.name}
          </Link>
        </div>)
      )}
      <button type="button">Load More</button>
      {/* change to :
        <button OnClick={onClickFunction}>
          Load More
        </button>
       */}
    </div>

  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery($offset: Int, $limit: Int) {
    channels(offset: $offset, limit: $limit) {
      id
      name
    }
  }
`;


export default graphql(channelsListQuery, {
  options: { 
    //pollInterval: 5000
    variables: {
      offset: 0,
      limit: 1
    }
  },
})(ChannelsList);

