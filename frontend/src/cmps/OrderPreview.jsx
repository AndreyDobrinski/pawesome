import { Link } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
import { saveOrder, updateOrder } from '../store/actions/orderActions.js'
import { userService } from '../services/userService.js'
import {Chat} from './Chat.jsx'
import { toggleDarkMode } from '../store/actions/appSettingsActions'
import { ReactComponent as ChatBlack } from "../assets/imgs/chat-black.svg"
import { ReactComponent as ChatWhite } from "../assets/imgs/chat-white.svg"




export class _OrderPreview extends Component {

    state = {
        status: '',
        moreInfo: false,
        isOwner: !!this.props.user.isHost,
        ownerName: '',
    }

    async componentDidMount() {
        var { order } = this.props
        var user = await userService.getById(order.ownerId)
        var ownerName = user.fullname
        this.setState({ status: order.status, ownerName })
    }

    changeShow = () => {
        this.setState({ moreInfo: !this.state.moreInfo })
    }

    updateStatus = ({ target }) => {
        this.setState({ status: target.value }, () => {
            var { order } = this.props
            var newOrder = { ...order, status: target.value }
            this.props.updateOrder(newOrder)
        })
    }

    render() {
        var { moreInfo, status, isOwner, ownerName } = this.state
        var { order } = this.props
        if (!order) return <div className="order"></div>
        return <div className="order" >
            <div className="order-short">
                <Link className="order-pet" to={`/pet/${order.pet._id}`}>
                    <div className="order-img square-ratio">
                        <img className="order-pet-img" src={order.pet.imgUrls[0]} alt="" />
                    </div>
                </Link>
                <div className="order-info">
                    {isOwner && <div className="order-from">
                        <span >From: </span><Link className="order-user-name" to={`/profile/${order.byUser._id}`}>{order.byUser.fullname}</Link>
                    </div>}
                    {!isOwner && <div className="order-from">
                        <span className={`${this.props.isDarkMode ? 'dark-mode-profile-orders-to' : ''}`}>To: </span><Link className="order-user-name" to={`/profile/${order.pet.host_id}`}>{ownerName}</Link>
                    </div>}
                    <div className="order-from">
                        <span className={`${this.props.isDarkMode ? 'dark-mode-profile-orders-about-pet' : ''}`}>About pet: </span><Link className="order-user-name" to={`/pet/${order.pet._id}`}>{order.pet.name}</Link>
                    </div>

                    <div className="order-date">
                        {order.createdAt}
                    </div>

                    {/* <div className={`order-show-more ${this.props.isDarkMode ? 'dark-mode-profile-show-more' : ''}`} onClick={this.changeShow}>...</div> */}
                    {/* <div className={`order-show-more ${this.props.isDarkMode ? 'dark-mode-profile-show-more' : ''}`} onClick={this.changeShow}><ChatBlack/></div> */}
                    <div className={`order-show-more ${this.props.isDarkMode ? 'dark-mode-profile-show-more' : ''}`} onClick={this.changeShow}>{this.props.isDarkMode ? <ChatWhite/> : <ChatBlack/>}</div>
                </div>
                <div className="order-status">
                    {isOwner && <select className={status} value={status} name="status" id="" onChange={this.updateStatus}>
                        <option className="requested" value="requested">requested</option>
                        <option className="pending" value="pending">pending</option>
                        <option className="accepted" value="accepted">accepted</option>
                        <option className="denied" value="denied">denied</option>
                    </select>}
                    {!isOwner && <div className={`user-status ${status}`}>{status}</div>}
                </div>
            </div>
            {moreInfo && <div className="order-more">
                <div className={`order-msg ${this.props.isDarkMode ? 'dark-mode-profile-order-msg' : ''}`}>"{order.message}"</div>
                <Chat topic={this.props.order._id} about={this.props.order.pet.name}/>
            </div>}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        isDarkMode: state.appSettingsModule.isDarkMode
    }
}

const mapDispatchToProps = {
    saveOrder,
    updateOrder,
    toggleDarkMode
}

export const OrderPreview = connect(mapStateToProps, mapDispatchToProps)(_OrderPreview)