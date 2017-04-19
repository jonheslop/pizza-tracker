import { gql, graphql } from 'react-apollo'

function Submit ({ createOrder }) {
  function handleSubmit (e) {
    e.preventDefault()

    let orderNumber = parseInt(e.target.elements.orderNumber.value, 10)

    if (!orderNumber ) {
      window.alert('Order number required.')
      return false
    }

    createOrder(orderNumber)

    // reset form
    e.target.elements.orderNumber.value = orderNumber + 1
  }

  return (
    <form onSubmit={handleSubmit} className="cf">
      <h1 className="tc light-green">Add an order</h1>
      <input className="fl w-70 border-box pa2 f4 b sans-serif b--near-black ba" name='orderNumber' pattern="\d*" />
      <button className="fl w-30 border-box pa2 f4 b sans-serif tracked ttu ba b--near-black bg-light-green" type='submit'>Add</button>
    </form>
  )
}

const createOrder = gql`
  mutation createOrder($orderNumber: Int!) {
    createOrder(orderNumber: $orderNumber) {
      id
      orderNumber
      createdAt
    }
  }
`

export default graphql(createOrder, {
  props: ({ mutate }) => ({
    createOrder: (orderNumber) => mutate({
      variables: { orderNumber },
      updateQueries: {
        allOrders: (previousResult, { mutationResult }) => {
          const newOrder = mutationResult.data.createOrder
          return Object.assign({}, previousResult, {
            // Append the new order
            allOrders: [newOrder, ...previousResult.allOrders]
          })
        }
      }
    })
  })
})(Submit)
