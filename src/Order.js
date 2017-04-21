import React, { Component} from 'react'

class Order extends Component {

  render() {
    return (
      <li
          className={ this.props.status === 'pending' ? 'dn' : `lh-title tc mb5 fw8 f-headline` }>
          <span style={{fontSize: '2em'}}>{this.props.order}</span>
      </li>
    )
  }

}

export default Order

Order.propTypes = {
  order: React.PropTypes.number,
}
