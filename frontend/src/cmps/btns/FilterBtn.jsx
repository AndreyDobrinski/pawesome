import {Component} from 'react'
import {connect} from 'react-redux'
import {loadPets} from '../../store/actions/petActions.js'

export class _FilterBtn extends Component {

    onFilter = () => {
        const {field, value} = this.props
        this.props.loadPets({[field]: value})
    }

    render() {

        return <button onClick={this.onFilter} className="filter-button">{this.props.value}</button>
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
  
  export const FilterBtn = connect(mapStateToProps, mapDispatchToProps)(_FilterBtn)