import {Component} from 'react'

export class FilterBtn extends Component {

    render() {
        return <button class="filter-button">{this.props.filterValue}</button>
    }

}