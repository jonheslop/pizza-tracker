import React, { Component} from 'react'
import Order from './Order'

class Orders extends Component {

  render() {
    return (
    <ul className="list pa0 ma0 mt2">
        {this.props.orders.map((order, index) => {
          return (<Order
            key={index}
            index={index}
            order={order.orderNumber}
            status={order.orderStatus}
          />)
        })}
    </ul>
    )
  }

}

export default Orders

Orders.propTypes = {

}
