import { Component } from 'react'
import { connect } from 'react-redux'


import { loadPets, setFilter} from '../../store/actions/petActions.js'

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

        return <input name="name" value={this.state.value} onChange={this.handleInput} placeholder="pet name"/>
    }

}

const mapStateToProps = (state) => {
    return {
        pets: state.petModule.pets,
        filterBy: state.petModule.filterBy
    }
}

const mapDispatchToProps = {
    loadPets,
    setFilter
}

export const FilterNameInput = connect(mapStateToProps, mapDispatchToProps)(_FilterNameInput)