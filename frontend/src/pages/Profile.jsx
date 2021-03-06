import { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'

import { userService } from '../services/userService.js'
import { OrderList } from '../cmps/OrderList.jsx'
import { loadOrders } from '../store/actions/orderActions.js'
import { socketService } from '../services/socketService'
import { toggleDarkMode } from '../store/actions/appSettingsActions'




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
            <section className={`profile-page ${this.props.isDarkMode ? 'dark-mode-profile-container' : ''}`}>
                <div className="profile-container container">

                    <div className="profile-row">

                        <div className="profile-col-md-4">

                            <div className="profile-img">
                                {user.imgUrl && <img src={user.imgUrl} alt="" />}
                                {!user.imgUrl && <img src='https://icons-for-free.com/iconfiles/png/512/avatar+human+male+man+people+person+profile+user+users+icon-1320190727966457290.png' alt="" />}
                            </div>

                        </div>

                        <div className="profile-col-md-6">
                            <div className="profile-head">
                                {!isOwner && <div className="profile-tab" id="myTabContent">
                                    <div className="profile-row-desc">
                                        <div className="profile">
                                            <label className={`profile-desc-title ${this.props.isDarkMode ? 'dark-mode-profile-desc-title' : ''}`}>Full Name</label>
                                        </div>
                                        <div className="profile">
                                            <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}>{user.fullname}</p>
                                        </div>
                                    </div>
                                    <div className="profile-row-desc">
                                        <div className="profile">
                                            <label className={`profile-desc-title ${this.props.isDarkMode ? 'dark-mode-profile-desc-title' : ''}`}>Email</label>
                                        </div>
                                        <div className="profile">
                                            {user.contactInfo.email && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}>{user.contactInfo.email}</p>}
                                            {!user.contactInfo.email && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}></p>}
                                        </div>
                                    </div>
                                    <div className="profile-row-desc">
                                        <div className="profile">
                                            <label className={`profile-desc-title ${this.props.isDarkMode ? 'dark-mode-profile-desc-title' : ''}`}>Phone</label>
                                        </div>
                                        <div className="profile">
                                            {user.contactInfo.phone && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}>{user.contactInfo.phone}</p>}
                                            {!user.contactInfo.phone && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}></p>}
                                        </div>
                                    </div>
                                    <div className="profile-row-desc">
                                        <div className="profile">
                                            <label className={`profile-desc-title ${this.props.isDarkMode ? 'dark-mode-profile-desc-title' : ''}`}>Family status</label>
                                        </div>
                                        <div className="profile">
                                            {user.familyStatus && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}>{user.familyStatus}</p>}
                                            {!user.familyStatus && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}></p>}
                                        </div>
                                    </div>
                                    <div className="profile-row-desc">
                                        <div className="profile">
                                            <label className={`profile-desc-title ${this.props.isDarkMode ? 'dark-mode-profile-desc-title' : ''}`}>House type</label>
                                        </div>
                                        <div className="profile">
                                            {user.houseStatus && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}>{user.houseStatus}</p>}
                                            {!user.houseStatus && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}></p>}
                                        </div>
                                    </div>

                                </div>
                                }
                                {isOwner && <div className="profile-tab" id="myTabContent">
                                    <div className="profile-row-desc">
                                        <div className="profile">
                                            <label className={`profile-desc-title ${this.props.isDarkMode ? 'dark-mode-profile-desc-title' : ''}`}>Name</label>
                                        </div>
                                        <div className="profile">
                                            <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}>{user.fullname}</p>
                                        </div>
                                    </div>
                                    <div className="profile-row-desc">
                                        <div className="profile">
                                            <label className={`profile-desc-title ${this.props.isDarkMode ? 'dark-mode-profile-desc-title' : ''}`}>Email</label>
                                        </div>
                                        <div className="profile">
                                            {user.contactInfo.email && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}>{user.contactInfo.email}</p>}
                                            {!user.contactInfo.email && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}></p>}
                                        </div>
                                    </div>
                                    <div className="profile-row-desc">
                                        <div className="profile">
                                            <label className={`profile-desc-title ${this.props.isDarkMode ? 'dark-mode-profile-desc-title' : ''}`}>Phone</label>
                                        </div>
                                        <div className="profile">
                                            {user.contactInfo.phone && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}>{user.contactInfo.phone}</p>}
                                            {!user.contactInfo.phone && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}></p>}
                                        </div>
                                    </div>
                                    <div className="profile-row-desc">
                                        <div className="profile">
                                            <label className={`profile-desc-title ${this.props.isDarkMode ? 'dark-mode-profile-desc-title' : ''}`}>Address</label>
                                        </div>
                                        <div className="profile">
                                            {user.loc.address && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}>{user.loc.address}</p>}
                                            {!user.loc.address && <p className={`profile-desc-title-desc ${this.props.isDarkMode ? 'dark-mode-profile-desc-title-desc' : ''}`}></p>}
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>

                        <div className="profile-col-md-2">
                            <button className={`profile-logout-btn ${this.props.isDarkMode ? 'dark-mode-plan-adopt-btn' : ''}`} onClick={this.onLogOut}>Logout</button>
                        </div>
                    </div>

                    <div className="profile-row">


                        <div className="profile-col-md-10 orders">
                            {!isOwner && <h4 className={`${this.props.isDarkMode ? 'dark-mode-profile-orders-title' : ''}`}>My requests</h4>}
                            {isOwner && <h4>Requests pending</h4>}
                            <OrderList orders={orders} user={user} onStartChat={this.onStartChat} />

                        </div>

                        <div className="profile-col-md-2">
                        </div>

                    </div>
                </div>


            </section>
        )
    }


}


const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        orders: state.orderModule.orders,
        isDarkMode: state.appSettingsModule.isDarkMode
    }
}
const mapDispatchToProps = {
    logout,
    loadOrders,
    toggleDarkMode

}


export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile)