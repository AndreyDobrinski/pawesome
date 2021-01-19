import { Component } from 'react'
import { connect } from 'react-redux'

import { loadOrders } from '../store/actions/orderActions.js'
import { PetList } from '../cmps/PetList.jsx'
import { userService } from '../services/userService.js'
import { petService } from '../services/petService.js'
import { OrderList } from '../cmps/OrderList.jsx'

export class _OwnerProfile extends Component {

    state = {
        owner: null,
        pets: null,
        orders: null
    }

    async componentDidMount() {
        const { ownerId } = this.props.match.params;
        try {
            var owner = await userService.getById(ownerId)
            var { pets } = owner

           await this.props.loadOrders()
           var orders = this.props.orders
            // var {orders} = this.props

            this.setState({ owner, pets, orders})
        } catch (err) {
            console.log('Error catched in fronf2', err)
        }
    }


    render() {
        const { owner, pets, orders, moreInfo } = this.state
        if (!owner) return <div className="container">Loading...</div>

        return (
            <div className="owner-profile container">
                {orders && <OrderList orders={orders} />}
                <div className="orders flex column">lololo</div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pets: state.petModule.pets,
        orders: state.orderModule.orders
    }
}

const mapDispatchToProps = {
    loadOrders
}

export const OwnerProfile = connect(mapStateToProps, mapDispatchToProps)(_OwnerProfile)