import React, { Component} from 'react'
import './order.css'

class Order extends Component {

  render() {
    return (
      <li
          className={ this.props.status === 'pending' ? 'dn' : `lh-title tc mb5 fw8 f1 f-headline-ns flash` }>
          <span style={{fontSize: '2em'}}>{this.props.order}</span>
      </li>
    )
  }

}

export default Order

Order.propTypes = {
  order: React.PropTypes.number,
}
