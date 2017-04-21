import React, { Component} from 'react'

class OrdersRemove extends Component {

  render() {
    return (
      <div className="cf pt3 mv3 bt b--light-green">
        <button
          type="submit"
          onClick={(e) => {
            this.props.onDelete()
          }}
          className="fl w-100 border-box pa3 f4 b sans-serif tracked ttu ba b--light-red bg-light-red pointer">
          Remove all orders 😵
        </button>
      </div>
    )
  }
}

export default OrdersRemove

OrdersRemove.propTypes = {
  onDelete: React.PropTypes.func,
}
