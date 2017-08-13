import React from 'react';
import {
  Link
} from 'react-router-dom'

import {
    gql,
    graphql,
} from 'react-apollo';

import AddChannel from './AddChannel';
import LoadMore from './LoadMore';

//const ChannelsList = ({ data: {loading, error, channels }}) => {
const ChannelsList = (props) => {
  console.log('props: ', props)
  // if (loading) {
  //   return <p>Loading ...</p>;
  // }
  // if (error) {
  //   return <p>{error.message}</p>;
  // }

  // console.log(this.props.channels)
  // return (
  //   <div className="channelsList">
  //     <AddChannel />
  //     { channels.map( ch =>
  //       (<div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>
  //         <Link to={ch.id < 0 ? `/` : `channel/${ch.id}`}>
  //           {ch.name}
  //         </Link>
  //       </div>)
  //     )}
  //     {/*<button type="button">Load More</button>*/}
  //       {/* <button OnClick={testFetchMore}>
  //         Load More
  //       </button> */}
  //   </div>

  // );
};

ChannelsList.propType = {
  test: React.PropTypes.func
}

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
    pollInterval: 5000,
    variables: {
      offset: 0,
      limit: 2
    }
  },
  // apollo client will automatically adds loading, data, and the result of the query
  props: (props) => {
    return Object.assign(props, {
      testFunc: () => {
        console.log('hello')
      }
    })
  } 
})(ChannelsList);

