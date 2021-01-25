import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadPets, setFilter} from '../../store/actions/petActions.js'
import { toggleDarkMode } from '../../store/actions/appSettingsActions'


import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@material-ui/core';



class _FilterBySize extends Component {

    state = {
        value: 'big'
    }

    handleInput = ({ target }) => {
       
        this.setState({value: target.value})
        // const filterBy = {...this.props.filterBy, 'size': target.value }
        // this.props.loadPets(filterBy)
    }

    render() {

        return (<div className="flex align-center">
                
                <h4 className={`pet-list-select-title ${this.props.isDarkMode ? 'dark-mode-pet-select-title' : ''}`}>Size:</h4>
                <Select name="size" value={this.state.value} onChange={this.handleInput} className={`pet-list-select ${this.props.isDarkMode ? 'dark-mode-pet-list-select' : ''}`}>
                    <MenuItem value="large" defaultValue>large (12-16 lbs)</MenuItem>
                    <MenuItem value="medium" defaultValue>medium (7-11 lbs)</MenuItem>
                    <MenuItem value="small" defaultValue>small(0-6 lbs)</MenuItem>
                </Select>
        </div>)
    }

}

const mapStateToProps = (state) => {
    return {
        pets: state.petModule.pets,
        filterBy: state.petModule.filterBy,
        isDarkMode: state.appSettingsModule.isDarkMode

    }
}

const mapDispatchToProps = {
    loadPets,
    setFilter,
    toggleDarkMode

}

export const FilterBySize = connect(mapStateToProps, mapDispatchToProps)(withRouter(_FilterBySize))