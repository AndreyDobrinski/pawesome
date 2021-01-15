import { Component } from 'react'
import {connect} from 'react-redux'

import {loadPets} from '../store/actions/petActions.js'
import { PetList } from '../cmps/PetList.jsx'

export class _Pet extends Component {

  state = {
  
  }
  
  componentDidMount(){
    
    this.props.loadPets({})
  }

  render() {
    const {pets} = this.props

    return (
      <div className="pet-list container">
        {/* <h1 className="page-pet-title">Pets</h1> */}
        <PetList pets={pets}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pets: state.petModule.pets
  }
}

const mapDispatchToProps = {
    loadPets
}

export const Pet = connect(mapStateToProps, mapDispatchToProps)(_Pet)