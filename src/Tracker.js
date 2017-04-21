import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Orders from './Orders'
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
        allOrders(orderBy: createdAt_DESC, first: 100) {
            id
            orderNumber
            orderStatus
            createdAt
        }
    }
`


class Tracker extends Component {

  state = {
    order: '',
  }

  componentDidMount() {
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
          console.log('mutation occured', subscriptionData.data.Order.mutation)
          if (subscriptionData.data.Order.mutation === 'CREATED') {
              console.log('previousState', previousState)
              const newOrder = subscriptionData.data.Order.node
              console.log('newOrder',newOrder)
              const orders = [newOrder].concat(previousState.allOrders)
              console.log('orders',orders)
              return {
                allOrders: orders,
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
      console.log('orders',this.props.allOrdersQuery.allOrders)
    return (
      <main role="main" className="ph4">
        {/* <h1 className="f1">🍕  Your pizza is ready!</h1> */}
        <Orders orders={this.props.allOrdersQuery.allOrders || []}/>
      </main>
    )
  }


  _onSend = () => {
    // console.log('Send order: ', this.state.order, this.props.travellerId)
    this.props.createOrderMutation({
      variables: {
        orderNumber: this.state.order
      }
    })
  }

}

export default graphql(createOrder, {name : 'createOrderMutation'})(
  graphql(allOrders, {name: 'allOrdersQuery'})(Tracker)
)
