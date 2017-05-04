import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

function DeleteOrders ({ deleteNodeById, orders, id }) {
  function handleDelete (id) {
    orders.map((order) => {
      var orderElement = document.getElementById(order.id)
      orderElement.parentNode.removeChild(orderElement)
      deleteNodeById(order.id)
      return true
    })
  }

  return (
    <div className="cf pt3 mv3 bt b--light-green">
      <button
        onClick={() => {
           handleDelete()
         }}
        className="fl w-100 border-box pa3 f4 b sans-serif tracked ttu ba b--light-red bg-light-red pointer">
        Remove all orders 😵
      </button>
    </div>
  )
}

const DeleteNode = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`

export default graphql(DeleteNode, {
  props: ({ ownProps, mutate }) => ({
    deleteNodeById: (id) => mutate({
      variables: { id },
    })
  })
})(DeleteOrders)
