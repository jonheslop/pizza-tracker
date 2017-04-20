import React, { Component} from 'react'

class Order extends Component {

  render() {
    const extra = { fontSize: '6rem'},
    normal = { fontSize: '5rem'}

    return (
      <li
          className={ this.props.status === 'pending' ? 'lh-solid tc mb4 fw8 red' : `lh-solid tc mb4 fw8` }
          style={this.props.index === 0 ? extra : normal}>
          {this.props.order}
      </li>
    )
  }

}

export default Order

Order.propTypes = {
  order: React.PropTypes.number,
}
