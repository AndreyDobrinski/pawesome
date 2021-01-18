import { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'







export class _Profile extends Component {

    state = {

    }


    componentDidMount() {

    }


    onLogOut = ()=>{
        this.props.logout()
        this.props.history.push('/')
    }


    onModalEditClicked = () => {
        console.log('Edit modal opend');
    }

    render() {
        const { loggedInUser } = this.props

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
                            <h6>Web Developer and Designer</h6>
                            <div className="profile-about">About me</div>
                        </div>

                    </div>

                    <div className="profile-col-md-2">
                        <button className="profile-edit-btn" onClick={this.onModalEditClicked}>Edit Profile</button>
                        {/* <button className="profile-logout-btn" onClick={this.props.logout}>LogOut</button> */}
                        <button className="profile-logout-btn" onClick={this.onLogOut}>LogOut</button>
                    </div>

                </div>
                <div className="profile-row">

                    <div className="profile-col-md-4">

                        <div className="profile-work">
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
                        </div>

                    </div>


                    <div className="profile-col-md-8">

                        <div className="profile-tab" id="myTabContent">


                            <div className="profile-row">
                                <div className="profile-col-md-6">
                                    <label>User Id</label>
                                </div>
                                <div className="profile-col-md-6">
                                    <p>{loggedInUser._id}</p>
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="profile-col-md-6">
                                    <label>Fullame</label>
                                </div>
                                <div className="profile-col-md-6">
                                    <p>{loggedInUser.fullname}</p>
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="profile-col-md-6">
                                    <label>Email</label>
                                </div>
                                <div className="profile-col-md-6">
                                    <p>kshitighelani@gmail.com</p>
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="profile-col-md-6">
                                    <label>Phone</label>
                                </div>
                                <div className="profile-col-md-6">
                                    <p>123 456 7890</p>
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="profile-col-md-6">
                                    <label>Username</label>
                                </div>
                                <div className="profile-col-md-6">
                                    <p>{loggedInUser.username}</p>
                                </div>
                            </div>

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
        loggedInUser: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    logout
}



export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile)