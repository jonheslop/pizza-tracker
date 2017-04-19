import React from 'react'
import { gql, graphql } from 'react-apollo'

function PostUpvoter ({ upvote, orderNumber, orderStatus, id }) {
  function handleStatus (id, status) {
    if (status == 'pending') {
      upvote(id, 'complete')
    } else {
      upvote(id, 'pending')
    }
  }

  return (
    <button onClick={() => handleStatus(id, orderStatus)} className={ orderStatus == 'pending' ? 'db w-100 pa3 ba b--near-white cf bg-near-white' : 'db w-100 pa3 ba b--near-black cf bg-light-green' }>
      <strong className="f3 db">{orderNumber}</strong>
      <span className="">{orderStatus}</span>
    </button>
  )
}

const changeStatus = gql`
  mutation updateOrder($id: ID!, $orderStatus: String) {
    updateOrder(id: $id, orderStatus: $orderStatus) {
      id
      orderStatus
    }
  }
`

export default graphql(changeStatus, {
  props: ({ ownProps, mutate }) => ({
    upvote: (id, orderStatus) => mutate({
      variables: { id, orderStatus },
      optimisticResponse: {
        updateOrder: {
          id: ownProps.id,
          orderStatus: 'complete'
        }
      }
    })
  })
})(PostUpvoter)
