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

    }
    
    render() {

    //   const text = this.state.liked ? 'liked' : 'haven\'t liked';
      const label = this.state.liked ? '💗' : '🤍'
      const numberOfLikes = (+this.props.pet.likers) + 1

      return (
        <div >
          <button  onClick={this.onClick}>{label}</button>
          <span>{`(${numberOfLikes})`}</span>
          {/* <p>
            you {text} this. Click to toggle.
          </p> */}
        </div>
      )
    }
  }
