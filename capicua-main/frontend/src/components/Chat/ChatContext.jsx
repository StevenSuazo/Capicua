import React, { Component } from 'react'
import "../../stylesheets/chat.css"

class ChatContext extends Component {
  state = {
    message: "",
  }

  render() {
    return (
      <form
        className="flex-row-start"
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: "" })
        }}
      >
        <input
          className="input-textarea"
          type="text"
          placeholder={'Enter message...'}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <input className="send-button" type="submit" value={'Send'} />
      </form>
    )
  }
}

export default ChatContext