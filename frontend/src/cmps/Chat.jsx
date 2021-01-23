import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socketService'

class _Chat extends Component {
  state = {
    msg: { txt: '' },
    msgs: [],
    topic: null,
    isBotMode: false
  }

  componentDidMount() {
    socketService.setup()
    socketService.emit('chat topic', this.props.topic)
    socketService.on('chat addMsg', this.addMsg)
  }

  componentWillUnmount() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.terminate()
    clearTimeout(this.timeout)
  }

  addMsg = newMsg => {
    this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }))
    if (this.state.isBotMode) this.sendBotResponse();
  }

  sendBotResponse = () => {
    // Handle case: send single bot response (debounce).
    this.timeout && clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState(prevState => ({ msgs: [...prevState.msgs, { from: 'Bot', txt: 'You are amazing!' }] }))
    }, 1500)
  }

  // changeTopic = () => {
  //   socketService.emit('chat topic', this.state.topic)
  // }

  sendMsg = ev => {
    ev.preventDefault()
    const from = this.props.loggedInUser?.fullname || 'Guest'
    socketService.emit('chat newMsg', { from, txt: this.state.msg.txt })
    this.setState({ msg: { from: 'Guest', txt: '' } })
  }

  // handleChange = ev => {
  //   const { name, value } = ev.target
  //   this.setState({ [name]: value }, this.changeTopic)
  // }

  msgHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => {
      return {
        msg: {
          ...prevState.msg,
          [name]: value
        }
      }
    })
  }

  render() {
    return (
      <div className="chat">
        <h4>chat about {this.props.about}</h4>
        <form onSubmit={this.sendMsg}>
          <input
            type="text"
            value={this.state.msg.txt}
            onChange={this.msgHandleChange}
            name="txt"
            autoComplete="off"
          />
          <button>Send</button>
        </form>
        <ul>
          {this.state.msgs.map((msg, idx) => (
            <li key={idx}>{msg.from}: {msg.txt}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}
const mapDispatchToProps = {
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)
