import { OrderPreview } from './OrderPreview.jsx'

export function OrderList({ orders, user }) {
    if (!orders) return <div></div>
    return <div className="orders flex column">
        {orders.map(order => <OrderPreview key={order._id} order={order} user={user} />)}
    </div>
}