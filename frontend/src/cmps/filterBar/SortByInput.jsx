import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadPets, setFilter} from '../../store/actions/petActions.js'
import { toggleDarkMode } from '../../store/actions/appSettingsActions'


import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@material-ui/core';



class _SortByInput extends Component {

    state = {
        value : 'likes'
    }

    handleInput = ({ target }) => {
       
        this.setState({value: target.value})
        const filterBy = {...this.props.filterBy, 'sortBy': target.value }
        this.props.loadPets(filterBy)
    }

    render() {

        return (<div className="flex align-center">
                {/* <h4>Sort by:</h4>
                <select name="sortBy" value={this.state.value} onChange={this.handleInput}>
                    <option value="likes">Popularity</option>
                    <option value="name">Name</option>
                    <option value="time">Waiting Time</option>
                    <option value="orgname">Organization Name</option>
                </select> */}




                <h4 className={`pet-list-select-title ${this.props.isDarkMode ? 'dark-mode-pet-select-title' : ''}`}>Sort by:</h4>
                <Select name="sortBy" value={this.state.value} onChange={this.handleInput} className={`pet-list-select ${this.props.isDarkMode ? 'dark-mode-pet-list-select' : ''}`}>
                    <MenuItem value="likes" defaultValue>Popularity</MenuItem>
                    <MenuItem value="name" defaultValue>Name</MenuItem>
                    <MenuItem value="time" defaultValue>Waiting Time</MenuItem>
                    <MenuItem value="orgname" defaultValue>Organization Name</MenuItem>
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

export const SortByInput = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SortByInput))