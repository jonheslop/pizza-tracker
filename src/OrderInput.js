import React, { Component} from 'react'

class OrderInput extends Component {

  render() {
    return (
      <div className="cf pb3 mv3 bb b--light-green">
        <input
          className="fl w-50 w-70-ns pa3 sans-serif f4 ba b--light-gray bg-light-gray br0"
          placeholder="Enter order number..."
          type="text"
          pattern="\d*"
          value={this.props.order}
          autoFocus={true}
          onChange={(e) => this.props.onTextInput(parseInt(e.target.value, 10) || 0)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) { // ENTER
              this.props.onSend()
              this.props.onResetText()
            }
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            this.props.onSend()
            this.props.onResetText()
          }}
          className="fl w-50 w-30-ns border-box pa3 f4 b sans-serif tracked ttu ba b--light-green bg-light-green pointer dim">
          Add 🍕
        </button>
      </div>
    )
  }
}

export default OrderInput

OrderInput.propTypes = {
  order: React.PropTypes.number,
  onTextInput: React.PropTypes.func.isRequired,
  onResetText: React.PropTypes.func.isRequired,
  onSend: React.PropTypes.func.isRequired,
}
