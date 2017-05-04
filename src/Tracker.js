import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Orders from './Orders'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import logo from './pizzatipi.png'

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
        },
        _allOrdersMeta {
          count
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
          if (subscriptionData.data.Order.mutation === 'CREATED') {
              const newOrder = subscriptionData.data.Order.node
              const orders = [newOrder].concat(previousState.allOrders)
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
      if (this.props.allOrdersQuery._allOrdersMeta && this.props.allOrdersQuery._allOrdersMeta.count) {
        return (
          <main role="main" className="pa3">
            <h1 className="f4 tc f-subheadline-ns mt0"><img src={ logo } alt="Pizza Tipi logo" className="w2 h2 w4-ns h4-ns" /> Your pizza is ready!</h1>
            <Orders orders={this.props.allOrdersQuery.allOrders || []}/>
            <Link className="fixed right-1 bottom-1 link white grow pr1 pt1" to="/admin">▼</Link>
          </main>
        )
      } else {
        return (
          <main role="main" className="pa3">
            <h1 className="f4 tc f-subheadline-ns mt0"><img src={ logo } alt="Pizza Tipi logo" className="w2 h2 w4-ns h4-ns" /> Pizza is coming</h1>
            <Link className="fixed right-1 bottom-1 link white grow pr1 pt1" to="/admin">▼</Link>
          </main>
        )
      }
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
