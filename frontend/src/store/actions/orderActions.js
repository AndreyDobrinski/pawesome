import { orderService } from '../../services/orderService.js'

export function loadOrders() {
    return async (dispatch) => {
        const orders = await orderService.query()
        const action = {
            type: 'SET_ORDERS',
            orders
        }
        return await dispatch(action)
    }
}

export function saveOrder(pet, message) {
    return async (dispatch) => {
        const res = await orderService.saveOrder(pet, message) 
        const action = { type: 'SAVE_ORDER', newOrder: res }
        return await dispatch(action)
    }
}
export function updateOrder(order) {
    return async (dispatch) => {
        const newOrder = await orderService.updateOrder(order)
        const action = { type: 'UPDATE_ORDER', newOrder }
        return await dispatch(action)
    }
}