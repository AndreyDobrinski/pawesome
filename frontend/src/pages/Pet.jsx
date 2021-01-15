import { Component } from 'react'
import {connect} from 'react-redux'

import {loadPets} from '../store/actions/petActions.js'
import { PetList } from '../cmps/PetList.jsx'
import { FilterBtn } from '../cmps/btns/FilterBtn.jsx'

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
        <div className="flex">

          <FilterBtn filterValue="cats"/>
          <FilterBtn filterValue="dogs"/>
        </div>
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