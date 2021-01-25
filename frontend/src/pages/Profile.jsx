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
        isOnChat: false, //
        chatTopic: null,//
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

            const userOrders = this.getUserOrders(user, orders)
            this.setState({ user, orders: userOrders, isOwner })
        } catch (err) {
            console.log('Error catched in fronf2', err)
        }
    }


    getUserOrders = (user, orders) => {
        console.log('Profile ', user)
        const userOrders = (user.isHost) ? orders.filter(order => order.ownerId === user._id)
            : orders.filter(order => order.byUser._id === user._id)
        return userOrders
    }

    onLogOut = async () => {
        await this.props.logout()
        this.props.history.push('/')
    }

    onModalEditClicked = () => {
        console.log('Edit modal opend');
    }

    onStartChat = (order) => {
        console.log('Start chat for order ', order)
        // if (order._id !== this.state.chatTopic) 
        // this.setState({...this.state, isOnChat: true, chatTopic : order._id})
        // console.log( 'Start chat for order ', this.state.chatTopic)
        // socketService.emit('chat topic',  this.state.chatTopic)
    }

    render() {
        const { orders, user, isOwner } = this.state
        if (!user) return <div>Loading...</div>

        return (
            <section className="profile-container container ">

                {/* <div className="profile-row">
                    <div className="profile-col-md-10">
                        <h3>{user.fullname}</h3>
                    </div>
                    <div className="profile-col-md-2">
                        <button className="profile-edit-btn" onClick={this.onModalEditClicked}>Edit Profile</button>
                        <button className="profile-logout-btn" onClick={this.props.logout}>LogOut</button>
                    </div>
                </div> */}
                <div className="profile-row">

                    <div className="profile-col-md-4">
                        <div className="profile-img">

                            <img src={user.imgUrl} alt="" />

                            {/* <div className="file profile-btn ">
                                Change Photo
                                <input type="file" name="file" />
                            </div> */}

                        </div>
                    </div>

                    <div className="profile-col-md-6">
                        <div className="profile-head">
                            {/* <h5>{user.fullname}</h5> */}
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

                            {/* <h6>Web Developer and Designer</h6> */}
                            {/* <div className="profile-about">About me</div> */}
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

                        {/* <div className="profile-work">
                            <p>WORK LINK</p>
                            <span>Website Link</span><br />
                            <span>Bootsnipp Profile</span><br />
                            <span >Bootply Profile</span>
                            <p>SKILLS</p>
                            <span>Web Designer</span><br />
                            <span >Web Developer</span><br />
                            <span >WordPress</span><br />
                            <span >WooCommerce</span><br />
                            <span >PHP, .Net</span><br />
                        </div> */}
                        {/* <div className="profile-btn-sec">
                            <button className="profile-edit-btn" onClick={this.onModalEditClicked}>Edit Profile</button>
                        </div> */}
                    </div>

                    <div className="profile-col-md-2">
                        {/* {this.state.isOnChat && <Chat topic={this.state.chatTopic}/>} */}
                    </div>

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