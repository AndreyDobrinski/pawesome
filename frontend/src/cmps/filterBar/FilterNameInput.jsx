import { Component } from 'react'
import { connect } from 'react-redux'


import { loadPets, setFilter} from '../../store/actions/petActions.js'
import { toggleDarkMode } from '../../store/actions/appSettingsActions'


class _FilterNameInput extends Component {

    state = {
        name : ''
    }

    handleInput = ({ target }) => {
       
        this.setState({value: target.value})
        const filterBy = {...this.props.filterBy, 'name': target.value}
        console.log('Filter by with pet name: ', filterBy)
        this.props.loadPets(filterBy)
        delete filterBy.name
        this.props.setFilter(filterBy)
    }

    render() {
        return <input className={`pet-list-input ${this.props.isDarkMode ? 'dark-mode-pet-list-input' : ''}`} name="name" value={this.state.value} onChange={this.handleInput} placeholder="Pet name"/>
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

export const FilterNameInput = connect(mapStateToProps, mapDispatchToProps)(_FilterNameInput)