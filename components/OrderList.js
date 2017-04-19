import { gql, graphql } from 'react-apollo'
import PostUpvoter from './PostUpvoter'

const ORDERS_PER_PAGE = 10

function OrderList ({ data: { allOrders, loading, _allOrdersMeta }, loadMoreOrders }) {
  if (allOrders && allOrders.length) {
    const areMoreOrders = allOrders.length < _allOrdersMeta.count
    return (
      <section>
        <ul className="list pa0 ma0 mt2">
          {allOrders.map((order, index) =>
            <li key={order.id} className="pv2">
              <PostUpvoter id={order.id} orderNumber={order.orderNumber} orderStatus={order.orderStatus} />
            </li>
          )}
        </ul>
        {areMoreOrders ? <button onClick={() => loadMoreOrders()}> {loading ? 'Loading...' : 'Show More'} </button> : ''}
      </section>
    )
  }
  return <div>Loading</div>
}

const allOrders = gql`
  query allOrders($first: Int!, $skip: Int!) {
    allOrders(orderBy: createdAt_DESC, first: $first, skip: $skip) {
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
    data,
    loadMoreOrders: () => {
      return data.fetchMore({
        variables: {
          skip: data.allOrders.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new orders results to the old one
            allOrders: [...previousResult.allOrders, ...fetchMoreResult.allOrders]
          })
        }
      })
    }
  })
})(OrderList)
