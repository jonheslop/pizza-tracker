import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import AdminOrders from './AdminOrders'
import OrderInput from './OrderInput'
import DeleteOrders from './DeleteOrders'
import _ from 'lodash'

const createOrder = gql`
    mutation createOrder($orderNumber: Int!) {
        createOrder(orderNumber: $orderNumber) {
            id
            orderNumber
            orderStatus
            createdAt
        }
    }
`

const allOrders = gql`
    query allOrders {
        allOrders(orderBy: createdAt_DESC, last: 100) {
            id
            orderNumber
            orderStatus
            createdAt
        }
    }
`

class Tracker extends Component {

  state = {
    order: 1
  }

  componentDidMount() {
    // Subscribe to `CREATED`-mutations
    this.createOrderSubscription = this.props.allOrdersQuery.subscribeToMore({
      document: gql`
          subscription {
              Order(filter: {
                mutation_in: [CREATED, UPDATED]
              }) {
                  mutation
                  node {
                      id
                      orderNumber
                      orderStatus
                      createdAt
                  }
              }
          }
      `,
      updateQuery: (previousState, {subscriptionData}) => {
          if (subscriptionData.data.Order.mutation === 'CREATED') {
              const newOrder = subscriptionData.data.Order.node
              const orders = previousState.allOrders.concat([newOrder])
              return {
                allOrder: orders,
              }
          }
          else if (subscriptionData.data.Order.mutation === 'UPDATED') {
            const orders = previousState.allOrders.slice()
            const updatedOrder = subscriptionData.data.Order.node
            const oldOrderIndex = orders.findIndex(order => {
              return updatedOrder.id === order.id
            })
            orders[oldOrderIndex] = updatedOrder
            return {
              allOrders: orders,
            }
          }
      },
      onError: (err) => console.error('subscription error',err)
    })
  }

  render() {
    return (
      <main role="main" className="ph3">
        <OrderInput
          order={this.state.order}
          onTextInput={(order) => this.setState({order})}
          onResetText={(order) => this.setState({order: this.state.order + 1})}
          onSend={this._onSend}
        />
        <AdminOrders orders={this.props.allOrdersQuery.allOrders || []} />
        <DeleteOrders orders={this.props.allOrdersQuery.allOrders || []} />
      </main>
    )
  }


  _onSend = () => {
    // console.log('Send order: ', this.state.order, this.props.travellerId)
    this.props.createOrderMutation({
      variables: {
        orderNumber: this.state.order
      },
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
  }

}

export default graphql(createOrder, {name : 'createOrderMutation'})(
  graphql(allOrders, {name: 'allOrdersQuery'})(Tracker)
)
