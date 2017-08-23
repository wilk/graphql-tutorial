import React from 'react'
import {gql,graphql,} from "react-apollo"
import {channelsListQuery} from "./ChannelsListWithData"

// this component is used to make a mutation
const AddChannel = ({mutate}) => {
  const onKeyUp = evt => {
    if (evt.keyCode === 13) {
      // evt.persist is from react and it's used to fetch the value
      // during an async operation
      evt.persist()

      // this function is passed to the component by graphql HOC decorator
      mutate({
        // these variables are used to interpolate the mutation, defined below
        variables: {name: evt.target.value},
        // refetchQueries refetches every listed query after the mutation succeeded
        refetchQueries: [{query: channelsListQuery}]
      }).then(res => evt.target.value = '')
    }
  }

  return (
    <input type="text" placeholder="channel name" onKeyUp={onKeyUp}/>
  )
}

// this is the real mutation
const mutation = gql`
# redefine the mutation by passing the variable param $name
mutation addChannel($name: String!) {
  # then use it to perform the real mutation
  addChannel(name: $name) {
    id
    name
  }
}
`

// this is the new AddChannel component, decorated with GQL HOC
const AddChannelWithMutation = graphql(mutation)(AddChannel)

export default AddChannelWithMutation