import { gql, graphql } from 'react-apollo'
import PostUpvoter from './PostUpvoter'

const ORDERS_PER_PAGE = 4

function OrderList ({ data: { allOrders, loading, _allOrdersMeta }, loadMoreOrders }) {
  if (allOrders && allOrders.length) {
    const areMoreOrders = allOrders.length < _allOrdersMeta.count,
    extra = { fontSize: '6rem'},
    normal = { fontSize: '5rem'}
    return (
      <section>
        <ul className="list pa0 ma0 mt2">
          {allOrders.map((order, index) =>
            <li key={order.id} className={`lh-solid tc mb4 fw8 o-` + (100 - index * 30)} style={index == 0 ? extra : normal}>
              {order.orderNumber}
            </li>
          )}
        </ul>
      </section>
    )
  }
  return <div>Loading</div>
}

const allOrders = gql`
  query allOrders($first: Int!, $skip: Int!) {
    allOrders(orderBy: createdAt_DESC, first: $first, skip: $skip,
      filter: {
      orderStatus: "complete"
    }) {
      id
      orderNumber
      orderStatus
      createdAt
    },
    _allOrdersMeta {
      count
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (OrderList)
export default graphql(allOrders, {
  options: {
    variables: {
      skip: 0,
      first: ORDERS_PER_PAGE
    }
  },
  props: ({ data }) => ({
    data
  })
})(OrderList)
