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
                
                <h4 className={`pet-list-select-title ${this.props.isDarkMode ? 'dark-mode-pet-select-title' : ''}`}>Sort by:</h4>
                <Select name="sortBy" value={this.state.value} onChange={this.handleInput} className={`pet-list-select ${this.props.isDarkMode ? 'dark-mode-pet-list-select' : ''}`}>
                    <MenuItem value="likes" defaultValue>popularity</MenuItem>
                    <MenuItem value="name" defaultValue>name</MenuItem>
                    <MenuItem value="orgname" defaultValue>organization name</MenuItem>
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