import React, { Component} from 'react'

class OrderInput extends Component {

  render() {
    return (
      <div className='OrderInput'>
        <input
          className='InputField'
          placeholder='Enter your chat message...'
          type='text'
          value={this.props.message}
          autoFocus={true}
          onChange={(e) => this.props.onTextInput(e.target.value)}
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
  message: React.PropTypes.string.isRequired,
  onTextInput: React.PropTypes.func.isRequired,
  onResetText: React.PropTypes.func.isRequired,
  onSend: React.PropTypes.func.isRequired,
}
