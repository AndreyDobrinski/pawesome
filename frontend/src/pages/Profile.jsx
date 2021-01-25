import { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'

import { userService } from '../services/userService.js'
import { OrderList } from '../cmps/OrderList.jsx'
import { OrderPreview } from '../cmps/OrderPreview'
import { loadOrders } from '../store/actions/orderActions.js'
import { socketService } from '../services/socketService'

import { Chat } from '../cmps/Chat.jsx'


export class _Profile extends Component {

    state = {
        user: null,
        orders: null,
        isOwner: true,
    }


    async componentDidMount() {
        socketService.setup()
        const { userId } = this.props.match.params;
        try {
            var user = await userService.getById(userId)
            var isOwner = user.isHost ? true : false
            await this.props.loadOrders()
            var { orders } = this.props
            this.setState({ user, orders, isOwner })
        } catch (err) {
            console.log('Error catched in fronf2', err)
        }
    }

    onLogOut = async () => {
        await this.props.logout()
        this.props.history.push('/')
    }

    render() {
        const { orders, user, isOwner } = this.state
        if (!user) return <div>Loading...</div>

        return (
            <section className="profile-container container ">

                <div className="profile-row">
                    <div className="profile-col-md-4">
                        <div className="profile-img">
                            <img src={user.imgUrl} alt="" />
                        </div>
                    </div>
                    <div className="profile-col-md-6">
                        <div className="profile-head">
                            {!isOwner && <div className="profile-tab" id="myTabContent">
                                <div className="profile-row-desc">
                                    <div className="profile">
                                        <label>Full Name</label>
                                    </div>
                                    <div className="profile">
                                        <p>{user.fullname}</p>
                                    </div>
                                </div>
                                <div className="profile-row-desc">
                                    <div className="profile">
                                        <label>Email</label>
                                    </div>
                                    <div className="profile">
                                        <p>{user.contactInfo.email}</p>
                                    </div>
                                </div>
                                <div className="profile-row-desc">
                                    <div className="profile">
                                        <label>Phone</label>
                                    </div>
                                    <div className="profile">
                                        <p>{user.contactInfo.phone}</p>
                                    </div>
                                </div>
                                <div className="profile-row-desc">
                                    <div className="profile">
                                        <label>Family status</label>
                                    </div>
                                    <div className="profile">
                                        <p>{user.familyStatus}</p>
                                    </div>
                                </div>
                                <div className="profile-row-desc">
                                    <div className="profile">
                                        <label>House type</label>
                                    </div>
                                    <div className="profile">
                                        <p>{user.houseStatus}</p>
                                    </div>
                                </div>

                            </div>
                            }
                            {isOwner && <div className="profile-tab" id="myTabContent">
                                <div className="profile-row-desc">
                                    <div className="profile">
                                        <label>Name</label>
                                    </div>
                                    <div className="profile">
                                        <p>{user.fullname}</p>
                                    </div>
                                </div>
                                <div className="profile-row-desc">
                                    <div className="profile">
                                        <label>Email</label>
                                    </div>
                                    <div className="profile">
                                        <p>{user.contactInfo.email}</p>
                                    </div>
                                </div>
                                <div className="profile-row-desc">
                                    <div className="profile">
                                        <label>Phone</label>
                                    </div>
                                    <div className="profile">
                                        <p>{user.contactInfo.phone}</p>
                                    </div>
                                </div>
                                <div className="profile-row-desc">
                                    <div className="profile">
                                        <label>Address</label>
                                    </div>
                                    <div className="profile">
                                        <p>{user.loc.address}</p>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>

                    <div className="profile-col-md-2">
                        <button className="profile-logout-btn" onClick={this.onLogOut}>LogOut</button>
                    </div>
                </div>

                <div className="profile-row">
                    <div className="profile-col-md-10 orders">
                        {!isOwner && <h4>My requests</h4>}
                        {isOwner && <h4>Requests pending</h4>}
                        <OrderList orders={orders} user={user} onStartChat={this.onStartChat} />
                    </div>
                    <div className="profile-col-md-2"></div>
                </div>

            </section>
        )
    }


}


const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        orders: state.orderModule.orders
    }
}
const mapDispatchToProps = {
    logout,
    loadOrders
}


export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile)