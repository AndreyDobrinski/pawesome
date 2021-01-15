import React from 'react'
import {Component} from 'react'

export class LikeButton extends Component {
    
      state = {
        liked: false
      }
    
    onClick = () => {
      this.setState({
        liked: !this.state.liked
      })

      !this.state.liked&&this.props.liked(1)
      this.state.liked&&this.props.liked(-1)
    }
    
    render() {

    //   const text = this.state.liked ? 'liked' : 'haven\'t liked';
      const label = this.state.liked ? '💗' : '🤍'

      return (
        <div>
          <button  onClick={this.onClick}>{label}</button>
          {/* <p>
            you {text} this. Click to toggle.
          </p> */}
        </div>
      )
    }
  }
