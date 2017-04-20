import React, { Component} from 'react'
import AdminOrder from './AdminOrder'

class AdminOrders extends Component {

  render() {
    return (
    <ul className="list pa0 ma0 mt2">
        {this.props.orders.map((order, index) => {
          return (<AdminOrder
            key={index}
            id={order.id}
            orderNumber={order.orderNumber}
            orderStatus={order.orderStatus}
          />)
        })}
    </ul>
    )
  }

}

export default AdminOrders

AdminOrders.propTypes = {

}
