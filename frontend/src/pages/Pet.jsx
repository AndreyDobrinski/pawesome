import React, { Component } from 'react'
import {connect} from 'react-redux'

import {loadPets} from '../store/actions/petActions.js'
import { PetList } from '../cmps/PetList.jsx'
import { FilterBtn } from '../cmps/btns/FilterBtn.jsx'
import { SortByInput } from '../cmps/filterBar/SortByInput.jsx'
import { FilterNameInput } from '../cmps/filterBar/FilterNameInput.jsx'

export class _Pet extends Component {

  state = {
  
  }
  
  componentDidMount(){
    console.log('PET CDM --- ', this.props.filterBy)
    this.props.loadPets(this.props.filterBy)
  }

  render() {
    const {pets} = this.props

    return (
      <React.Fragment>
      <div className="pet-list container" style={{"marginTop": "200px"}}>
        <div className="flex justify-between">
          {/* <div>
            <FilterBtn field="size" value="big"/>
            <FilterBtn field="size" value="small"/>
          </div> */}
          {/* <FilterNameInput /> */}
          {/* <SortByInput /> */}
        </div>
          <PetList pets={pets}/>
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pets: state.petModule.pets,
    filterBy: state.petModule.filterBy
  }
}

const mapDispatchToProps = {
    loadPets
}

export const Pet = connect(mapStateToProps, mapDispatchToProps)(_Pet)