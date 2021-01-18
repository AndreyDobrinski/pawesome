import { OrderPreview } from './OrderPreview.jsx'

export function OrderList({ orders }) {
    return <div className="orders flex column">
        {orders.map(order => <OrderPreview key={order._id} order={order} />)}
    </div>
}