import { Component } from 'react'
import { connect } from 'react-redux'
import { saveOrder } from '../store/actions/orderActions.js'
import { orderService } from "../services/orderService.js";




export class _OrderAdd extends Component {

    state = {
        message: '',
        isOrderDone: false
    }

    async componentDidMount() {
        if (!this.props.loggedInUser) return
        let { pet } = this.props
        let res = await orderService.isOrderDone(pet._id, this.props.loggedInUser._id)
        this.setState({ isOrderDone: res })
    }

    onAddOrder = (ev) => {
        ev.preventDefault()
        let { pet, loggedInUser } = this.props
        if (!loggedInUser) return ///request to login
        let { message } = this.state
        this.props.saveOrder(pet, message)
            .then(() => { this.setState({ isOrderDone: true }) })
    }

    onInputChange = ({ target }) => {
        this.setState({ message: target.value })
    }

    render() {
        var { message, isOrderDone } = this.state
        var { pet } = this.props
        return <div className="pet-details-order">
            {!isOrderDone && <div className="order-not-submitted">
                <form className="add-order" onSubmit={this.onAddOrder}>
                    <textarea placeholder={`Hello! I want to adopt ${pet.name} ...`} onChange={this.onInputChange} value={message} name="order-txt" rows="8"></textarea>
                    <button className="add-order-btn btn2">Adopt {pet.name}</button>
                </form>
            </div>}

            {isOrderDone && <div className="order-submitted">
                <div className="order-empty">We are immensely thankful for you decision!</div>
                <div className="order-empty">We'll contact you soon.</div>
            </div>}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    saveOrder
}

export const OrderAdd = connect(mapStateToProps, mapDispatchToProps)(_OrderAdd)