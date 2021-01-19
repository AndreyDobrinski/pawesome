import React from 'react'
import { Component } from 'react'
import { ReactComponent as HeartFull } from "../../assets/imgs/heart-full.svg"
import { ReactComponent as HeartEmpty } from "../../assets/imgs/heart-empty.svg"


export class LikeButton extends Component {

  state = {
    liked: false
  }

  onClick = () => {
    this.setState({
      liked: !this.state.liked
    })

    !this.state.liked && this.props.liked(1)
    this.state.liked && this.props.liked(-1)
  }

  render() {
    const label = this.state.liked ? <HeartFull/> : <HeartEmpty/>

    return (
      <div>
        <div className="pet-preview-like-btn flex justify-center align-center" onClick={this.onClick}>{label}</div>
      </div>
    )
  }
}
