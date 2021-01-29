import React, { Component } from 'react'


import ChatContext from './chatContext'
import ChatMsg from './chatMsg';
import {allDominos} from "../allDominos"

const URL = 'ws://localhost:3001'
// not sure why socket server needs to be on a different localhost from React

class Chat extends Component {
  state = {
    name: 'Guest',
    messages: [],
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onmessage = e => {
      const message = JSON.parse(e.data)
      this.addMsg(message)
    }
  }
  
  submitMessage = messageString => {
    const message = { name: this.state.name, message: messageString }
    this.ws.send(JSON.stringify(message))
    this.addMsg(message)
  }
  
  addMsg = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  render() {
    return (

      <div className="flex-row-start chatBox-domino-container">
        <div className="form-container">
          <div className="header">
            <h1>Chat Box</h1>
          </div>
          <div className="msg-area">
            {this.state.messages.map((message, idx) =>
              <ChatMsg
                className="msgs"
                key={idx}
                message={message.message}
                name={message.name}
              />
            )}
          </div>
          {/* <div className="type-area">
            Name:
            <input
              type="text"
              id={'name'}
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              />
          </div> */}
          {/* <div className="text-area"> */}
            <ChatContext
              ws={this.ws}
              onSubmitMessage={messageString => this.submitMessage(messageString)}
            />
          {/* </div> */}
        </div>
          <img className="capicua-domino-lrg" src={allDominos["cd"]}></img>
        </div>

    )
  }
}

export default Chat