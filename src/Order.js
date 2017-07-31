import React, { Component} from 'react'
import './order.css'

class Order extends Component {

  render() {
    return (
      <li
          className={ this.props.status === 'pending' ? 'dn' : `lh-title tc mb5 fw8 f1 f-headline-ns flash w-100 vh-100 dt` }>
          <span className="dtc v-mid" style={{fontSize: '4em'}}>{this.props.order}</span>
      </li>
    )
  }

}

export default Order

Order.propTypes = {
  order: React.PropTypes.number,
}
