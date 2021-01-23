import { React, Component } from 'react'
import { connect } from 'react-redux'

import { loadOrders } from '../store/actions/orderActions.js'
import { PetList } from '../cmps/PetList.jsx'
import { userService } from '../services/userService.js'
import { petService } from '../services/petService.js'
import { OrderList } from '../cmps/OrderList.jsx'
import {Chat} from '../cmps/Chat.jsx'

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

    onStartChat = (order) => {
        console.log( 'Start chat for order ', order)
    }

    render() {
        const { owner, pets, orders, moreInfo } = this.state
        if (!owner) return <div className="container">Loading...</div>

        return (
            <React.Fragment>

                <div className="owner-profile container">
                    {orders && <OrderList orders={orders} onStartChat={this.onStartChat}/>}                
                </div>
                <div>
                    <Chat />
                </div>
            </React.Fragment>
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