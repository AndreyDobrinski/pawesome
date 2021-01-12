import { Component } from 'react'
import {connect} from 'react-redux'

export class _Pet extends Component {

  state = {

  }
  
  componentDidMount(){
  }

  
  
  
  render() {
    return (
      <div>
        <h1 className="page-pet-title">Pets</h1>
      </div>
    )
  }


}




const mapStateToProps = (state) => {
  return {
  }
}


const mapDispatchToProps = {

}

export const Pet = connect(mapStateToProps, mapDispatchToProps)(_Pet)