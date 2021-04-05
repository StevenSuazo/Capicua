import React, { Component } from 'react'
import ChatContext from './chatContext'
import ChatMsg from './chatMsg';
import {allDominos} from "../allDominos"

class Chat extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: this.props.username,
      messages: [],
    };
    this.addMsg = this.addMsg.bind(this);
  }

  // ws = new WebSocket(URL)

  componentDidMount() {
    // this.ws.onmessage = e => {
    //   const message = JSON.parse(e.data)
    //   this.addMsg(message)
    // }
    this.props.socket.on("addMsg", this.addMsg)
  }
  
  submitMessage = messageString => {
    const message = { name: this.state.name, message: messageString }
    this.props.socket.emit("sendMessage", message);
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
            <ChatContext
              // ws={this.ws}
              onSubmitMessage={messageString => this.submitMessage(messageString)}
            />
        </div>
          {/* <img className="capicua-domino-lrg" src={allDominos["cd"]}></img> */}
        </div>

    )
  }
}

export default Chat