import React, { Component} from 'react'

class OrderInput extends Component {

  render() {
    return (
      <div className="cf pb2 mv2 bb b--washed-green">
        <input
          className="w-100 pa3 sans-serif f4 ba b--white"
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
