import React, { Component} from 'react'

class Order extends Component {

  render() {
    return (
      <li
          className={ this.props.status === 'pending' ? 'dn' : `lh-solid tc mb4 fw8 f-headline` }>
          {this.props.order}
      </li>
    )
  }

}

export default Order

Order.propTypes = {
  order: React.PropTypes.number,
}
