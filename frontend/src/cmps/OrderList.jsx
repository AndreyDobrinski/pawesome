import { OrderPreview } from './OrderPreview.jsx'

export function OrderList({ orders, user, onStartChat }) {
    if (!orders) return <div>Loading...</div>
    return <div className="orders flex column">
        {orders.map(order => <OrderPreview key={order._id} order={order} user={user} onStartChat={onStartChat} />)}
    </div>
}