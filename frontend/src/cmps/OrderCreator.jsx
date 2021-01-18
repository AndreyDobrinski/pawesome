import { Component } from 'react'
import { connect } from 'react-redux'
import { saveOrder } from '../store/actions/orderActions.js'
import { orderService } from "../services/orderService.js";




export class _OrderCreator extends Component {

    state = {
        message: '',
        isOrderDone: false
    }

    async componentDidMount() {
        let { pet, userId } = this.props
        console.log('data', pet._id, userId)
        let res = await orderService.isOrderDone(pet._id, userId)
        this.setState({ isOrderDone: res })
    }

    onAddOrder = (ev) => {
        ev.preventDefault()
        let { pet } = this.props
        let { message } = this.state
        var order = {
            status: "pending",
            message: message,
            pet: {
                name: pet.name,
                _id: pet._id,
                imgUrls: pet.imgUrls
            },
            // byUser: {
            //     "_id": "u101",
            //     "fullname": "User 1"
            // }
        }
        this.props.saveOrder(order)
            .then(() => { this.setState({ isOrderDone: true }) })
    }

    onInputChange = ({ target }) => {
        this.setState({ message: target.value })
    }

    render() {
        var { message, isOrderDone } = this.state
        var { pet } = this.props
        return <div className="pet-details-order">
            {!isOrderDone && <form className="add-order" onSubmit={this.onAddOrder}>
                <textarea placeholder={`Hello! I want to adopt ${pet.name} ...`} onChange={this.onInputChange} value={message} name="order-txt" rows="8"></textarea>
                <button className="add-order-btn btn2">Adopt {pet.name}</button>
            </form>}
            {isOrderDone && <div className="order-empty">We are immensely thankful for you decision! We'll contact you soon.</div>}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
    saveOrder
}

export const OrderCreator = connect(mapStateToProps, mapDispatchToProps)(_OrderCreator)