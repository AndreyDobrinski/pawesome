import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadPets } from '../store/actions/petActions.js'
import { PetList } from '../cmps/PetList.jsx'
// import { FilterBtn } from '../cmps/btns/FilterBtn.jsx'
import {FilterBySize} from '../cmps/filterBar/FilterBySize.jsx'
import { SortByInput } from '../cmps/filterBar/SortByInput.jsx'
import { FilterNameInput } from '../cmps/filterBar/FilterNameInput.jsx'
import { toggleDarkMode } from '../store/actions/appSettingsActions'
import Loader from 'react-loader-spinner'


// import {} from '../assets/img/spinner-1s-200px.gif'

export class _Pet extends Component {

  state = {

  }

  componentDidMount() {
    // console.log('PET CDM --- ', this.props.filterBy)
    this.props.loadPets(this.props.filterBy)
  }

  render() {
    const { pets } = this.props
    console.log('loading', this.props.isLoading);

    return (
      <React.Fragment>
        <div className={`pet-list-page ${this.props.isDarkMode ? 'dark-mode-pet-page' : ''}`}>
          <div className="pet-list container" >
            <div className="pet-list-filter flex justify-between">
              {/* <div>
                <FilterBtn field="size" value="big" />
                <FilterBtn field="size" value="small" />
              </div> */}
              <FilterBySize />
              <FilterNameInput />
              <SortByInput />
            </div>
            {this.props.isLoading && <div className="loader flex justify-center align-center"><Loader type="TailSpin" color="#86cb77"height={100} width={100} timeout={3000} /></div> }
            {!this.props.isLoading && <PetList pets={pets} />}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pets: state.petModule.pets,
    filterBy: state.petModule.filterBy,
    isDarkMode: state.appSettingsModule.isDarkMode,
    isLoading: state.appSettingsModule.isLoading
  }
}

const mapDispatchToProps = {
  loadPets,
  toggleDarkMode

}

export const Pet = connect(mapStateToProps, mapDispatchToProps)(_Pet)