import { Link } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
import { saveOrder, updOrder } from '../store/actions/orderActions.js'
import { userService } from '../services/userService.js'

import { Chat } from '../cmps/Chat.jsx'




export class _OrderPreview extends Component {

    state = {
        status: '',
        moreInfo: false,
        isOwner: !!this.props.user.isHost,
        ownerName: '',
        isChatOpen: false

    }

    async componentDidMount() {
        var { order } = this.props
        var user = await userService.getById(order.ownerId)
        var ownerName = user.fullname
        this.setState({ status: order.status, ownerName })
    }

    onToggleChat = () => {
        this.setState({ isChatOpen: !this.state.isChatOpen })
    }

    changeShow = () => {
        this.setState({ moreInfo: !this.state.moreInfo })
    }
    updStatus = ({ target }) => {
        this.setState({ status: target.value }, () => {
            var { order } = this.props
            var newOrder = { ...order, status: target.value }
            console.log('OrderPreview:', newOrder)
            this.props.updOrder(newOrder)
        })
    }

    render() {
        var { moreInfo, status, isOwner, ownerName } = this.state
        var { order, onToggleChat } = this.props
        if (!order) return <div className="order"></div>
        return <div className="order">
            <div className="order-short">
                <Link className="order-pet" to={`/pet/${order.pet._id}`}>
                    <div className="order-img square-ratio">
                        <img className="order-pet-img" src={order.pet.imgUrls[0]} alt="" />
                    </div>
                    {/* {order.pet.name} */}
                </Link>
                <div className="order-info">
                    {isOwner && <div className="order-from">
                        <span>From: </span><Link className="order-user-name" to={`/profile/${order.byUser._id}`}>{order.byUser.fullname}</Link>
                    </div>}
                    {!isOwner && <div className="order-from">
                        <span>To: </span><Link className="order-user-name" to={`/profile/${order.pet.host_id}`}>{ownerName}</Link>
                    </div>}
                    <div className="order-from">
                        <span>About pet: </span><Link className="order-user-name" to={`/pet/${order.pet._id}`}>{order.pet.name}</Link>
                    </div>

                    <div className="order-date">
                        {order.createdAt}
                    </div>
                    <div className="chat-icon" onClick={onToggleChat}>chat</div>

                    <div className="order-show-more" onClick={this.changeShow}>
                        ...
                    </div>
                </div>
                <div className="order-status">
                    {isOwner && <select className={status} value={status} name="status" id="" onChange={this.updStatus}>
                        <option className="requested" value="requested">requested</option>
                        <option className="pending" value="pending">pending</option>
                        <option className="accepted" value="accepted">accepted</option>
                        <option className="denied" value="denied">denied</option>
                    </select>}
                    {!isOwner && <div className={`user-status ${status}`}>{status}</div>}
                </div>
            </div>
            {moreInfo && <div className="order-more">
                <div className="order-msg">{order.message}</div>
                {/* <Chat order={order} isOpen={this.state.isChatOpen} onClose={this.onToggleChat} /> */}

            </div>}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
    saveOrder,
    updOrder
}

export const OrderPreview = connect(mapStateToProps, mapDispatchToProps)(_OrderPreview)