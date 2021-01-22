import { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'

import { userService } from '../services/userService.js'
import { OrderList } from '../cmps/OrderList.jsx'
import { OrderPreview } from '../cmps/OrderPreview'
import { loadOrders } from '../store/actions/orderActions.js'








export class _Profile extends Component {

    state = {
        user: null,
        orders: null
    }


    async componentDidMount() {
        const { userId } = this.props.match.params;
        try {
            var user = await userService.getById(userId)
            // var { pets } = owner

            await this.props.loadOrders()
            var { orders } = this.props

            this.setState({ user, orders })
        } catch (err) {
            console.log('Error catched in fronf2', err)
        }
    }


    onLogOut = async () => {
        await this.props.logout()
        this.props.history.push('/')
    }


    onModalEditClicked = () => {
        console.log('Edit modal opend');
    }

    render() {
        const { loggedInUser } = this.props
        const { orders, user } = this.state
        console.log('in state', orders)
        if(!loggedInUser) return <div>Loading...</div>

        return (
            <section className="profile-container container ">

                <div className="profile-row">

                    <div className="profile-col-md-4">
                        <div className="profile-img">

                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />

                            <div className="file profile-btn ">
                                Change Photo
                                <input type="file" name="file" />
                            </div>

                        </div>
                    </div>

                    <div className="profile-col-md-6">
                        <div className="profile-head">
                            <h5>{loggedInUser.fullname}</h5>
                            {/* <h6>Web Developer and Designer</h6> */}
                            {/* <div className="profile-about">About me</div> */}
                        </div>
                    </div>

                    <div className="profile-col-md-2">
                        {/* <button className="profile-edit-btn" onClick={this.onModalEditClicked}>Edit Profile</button> */}
                        {/* <button className="profile-logout-btn" onClick={this.props.logout}>LogOut</button> */}
                        <button className="profile-logout-btn" onClick={this.onLogOut}>LogOut</button>
                    </div>

                </div>
                <div className="profile-row">


                    <div className="profile-col-md-4">
                        <div className="user-header">About me</div>

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
                        <div className="profile-tab" id="myTabContent">


                            <div className="profile-row desc">
                                <div className="profile">
                                    <label>Fullame</label>
                                </div>
                                <div className="profile">
                                    <p>{loggedInUser.fullname}</p>
                                </div>
                            </div>

                            <div className="profile-row desc">
                                <div className="profile">
                                    <label>Email</label>
                                </div>
                                <div className="profile">
                                    <p>kshitighelani@gmail.com</p>
                                </div>
                            </div>

                            <div className="profile-row desc">
                                <div className="profile">
                                    <label>Phone</label>
                                </div>
                                <div className="profile">
                                    <p>123 456 7890</p>
                                </div>
                            </div>

                        </div>


                        <button className="profile-edit-btn" onClick={this.onModalEditClicked}>Edit Profile</button>

                    </div>


                    <div className="profile-col-md-8">
                        <div className="user-header">My orders</div>
                        <OrderList orders={orders} user={user} />

                    </div>
                </div>








            </section>
        )
    }


}






const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser,
        orders: state.orderModule.orders

    }
}
const mapDispatchToProps = {
    logout,
    loadOrders

}



export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile)