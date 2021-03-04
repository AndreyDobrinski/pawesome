import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socketService'
import { toggleDarkMode } from '../store/actions/appSettingsActions'


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
    this.timeout && clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState(prevState => ({ msgs: [...prevState.msgs, { from: 'Bot', txt: 'You are amazing!' }] }))
    }, 1500)
  }

  sendMsg = ev => {
    ev.preventDefault()
    const from = this.props.loggedInUser?.fullname || 'Guest'
    socketService.emit('chat newMsg', { from, txt: this.state.msg.txt })
    this.setState({ msg: { from: 'Guest', txt: '' } })
  }

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
      <div className={`chat ${this.props.isDarkMode ? 'dark-mode-profile-chat' : ''}`}>
        <ul>
          {this.state.msgs.map((msg, idx) => (
            <li key={idx} className={msg.from === this.props.loggedInUser.fullname ? 'outcoming-msg' : 'incoming-msg'}><span>{msg.from}</span><span>{msg.txt}</span></li>
          ))}
        </ul>
        <form className="chat-form" onSubmit={this.sendMsg}>
          <input
            type="text"
            value={this.state.msg.txt}
            onChange={this.msgHandleChange}
            name="txt"
            autoComplete="off"
          />
          <button>Send</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser,
    isDarkMode: state.appSettingsModule.isDarkMode
  }
}
const mapDispatchToProps = {
  toggleDarkMode
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)
