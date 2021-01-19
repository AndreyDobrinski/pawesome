import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadPets, setFilter} from '../store/actions/petActions.js'
import { toggleDarkMode } from '../store/actions/appSettingsActions'

import { ReactComponent as Search } from "../assets/imgs/magnifying-glass.svg"



class _SearchFilterBar extends Component {

    state = {
        filterBy: this.props.filterBy
    }

    componentDidMount() {
        console.log('SEARCH BAR --- ', this.props.location )
        this.setState({ filterBy : this.props.filterBy })
    }

    handleInput = ({ target }) => {
       
        const callback = () => {
            
            console.log( 'handleInput, callback --- ', filterBy )
        }

        const filterBy = { ...this.state.filterBy, [target.name]: target.value }
        this.setState({ filterBy }, callback)

    }

    onSearchPet = (ev) => {
        ev.preventDefault()
        const { filterBy } = this.state
        console.log('onSearchPet --- ', filterBy)
        this.props.setFilter(filterBy)
        this.props.loadPets(filterBy)
        this.props.history.push('/pet')

    }

    render() {
        const { filterBy } = this.state

        return <form className="app-header-filter-container flex " onSubmit={this.onSearchPet}>
            <div className="app-header-filte-box flex">
                <div className="app-header-filte-box-type flex column">
                    <span className="type-title">Pet</span>
                    <select name="kind" value={filterBy.kind} onChange={this.handleInput}>
                        <option value="all">ALL</option>
                        <option value="cat">CATS</option>
                        <option value="dog">DOGS</option>
                        <option value="bird">BIRDS</option>
                    </select>
                </div>
                <div className="app-header-filte-box-age flex column">
                    <span className="age-title">Age</span>
                    <select name="age" value={filterBy.age} onChange={this.handleInput}>
                        <option value="all">ALL</option>
                        <option value="young">YOUNG</option>
                        <option value="adult">ADULT</option>
                        <option value="senior">SENIOR</option>
                    </select>
                </div>
                <div className="app-header-filte-box-gender flex column">
                    <span className="gender-title">Gender</span>
                    <select name="gender" value={filterBy.gender} onChange={this.handleInput}>
                        <option value="all">ALL</option>
                        <option value="male">BOY</option>
                        <option value="female">GIRL</option>
                    </select>
                </div>
                <div className="app-header-filte-box-location flex column">
                    <span className="location-title">Location</span>
                    <select name="address" value={filterBy.address} onChange={this.handleInput}>
                        <option value="all">ALL</option>
                        <option value="Haifa">Haifa</option>
                        <option value="Raanana">Raanana</option>
                    </select>
                </div>
                <div className="app-header-filte-box-Search flex justify-center align-center ">
                    <button className="search-btn btn1"><Search/></button>
                </div>
            </div>
        </form>
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

export const SearchFilterBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SearchFilterBar))