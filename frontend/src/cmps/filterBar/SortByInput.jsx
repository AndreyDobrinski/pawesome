import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadPets, setFilter} from '../../store/actions/petActions.js'

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

        return (<div>
                <h4>Sort by:</h4>
                <select name="sortBy" value={this.state.value} onChange={this.handleInput}>
                    <option value="likes">Popularity</option>
                    <option value="name">Name</option>
                    <option value="time">Waiting Time</option>
                    <option value="orgname">Organization Name</option>
                </select>
        </div>)
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

export const SortByInput = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SortByInput))