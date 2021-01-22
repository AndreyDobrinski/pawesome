import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socketService'

class _Chat extends Component {
  state = {
    msg: { txt: '' },
    msgs: [],
    isBotMode: true,
    currTypingUser: {
      username: '',
      isTyping: false
    }
  }

  componentDidMount() {
    const savedMsgs = socketService.getMsgsFromStorage() || [];
    this.setState({ msgs: savedMsgs });

    socketService.setup()
    socketService.emit('chat topic', this.props.order._id)

    socketService.on('chat addMsg', this.addMsg)

    socketService.on('userTyping', this.setUserTyping)
  }

  componentDidUpdate(prevProps) {
    const didOrderChange = prevProps.order._id !== this.props.order._id;

    if (didOrderChange) {
      socketService.emit('chat topic', this.props.order._id)
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    socketService.off('chat addMsg', this.addMsg)
    // socketService.off('userTyping', this.setUserTyping)

    socketService.terminate()
    clearTimeout(this.timeout)
  }

  setUserTyping = ({ username, msg }) => {

    this.setState({ currTypingUser: { username, isTyping: !!msg } }, () => {
      console.log('currTypingUser: ', this.state.currTypingUser);
    })
  }


  addMsg = newMsg => {
    this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }), () => {

      socketService.saveMsgsToStorage(this.state.msgs)
    })
    if (this.state.isBotMode) this.onSendBotResponse();
  }

  onSendBotResponse = () => {
    // Handle case: send single bot response (debounce).
    this.timeout && clearTimeout(this.timeout)

    this.timeout = setTimeout(this.sendBotResponse, 1500)
  }

  sendBotResponse = () => {
    this.setState(prevState => ({ msgs: [...prevState.msgs, { from: 'Bot', txt: 'You are amazing!' }] }), () => {
      socketService.saveMsgsToStorage(this.state.msgs)
    })
  }

  sendMsg = ev => {
    ev.preventDefault()
    const from = this.props.loggedinUser?.fullname || this.props.loggedinUser?.username || 'Me'

    socketService.emit('chat newMsg', { from, txt: this.state.msg.txt })
    this.setState({ msg: { from: 'Me', txt: '' } })
  }

  msgHandleChange = async ev => {
    const { name, value } = ev.target
    const user = {
      username: this.props.loggedinUser?.fullname || this.props.loggedinUser?.username || 'guest',
      msg: value
    }
    socketService.emit('typing', user)

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
    const { currTypingUser, msg } = this.state
    const { isOpen } = this.props
    return (
      <div className={`chat ${isOpen && 'active'}`}>
        <h2 className="chat-topic chat-layout flex space-between">Chat about this order!<i className="fas fa-times" onClick={this.props.onClose}></i></h2>
        <label>
          <input
            type="checkbox"
            name="isBotMode"
            checked={this.state.isBotMode}
            onChange={(ev) => this.setState({ isBotMode: ev.target.checked })}
            className="chat-layout"
          />
          Bot Mode
        </label>
        <h3>{currTypingUser?.isTyping && currTypingUser.username + ' is typing...'}</h3>

        <div className="chat-main-content">
          <ul className="chat-msgs chat-layout">
            {this.state.msgs.map((msg, idx) => (
              <li key={idx}><span className="from">{msg.from}:</span>{msg.txt}</li>
            ))}
          </ul>
          <form className="msg-form" onSubmit={this.sendMsg}>
            <input
              type="text"
              value={msg.txt}
              onChange={this.msgHandleChange}
              name="txt"
              className="msg-input"
              autoComplete="off" />
            <button>Send</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedinUser: state.userModule.loggedinUser
  }
}
const mapDispatchToProps = {
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)
