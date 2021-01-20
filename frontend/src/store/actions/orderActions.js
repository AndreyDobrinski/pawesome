import { orderService } from '../../services/orderService.js'

export function loadOrders(ownerId) {
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
export function updOrder(newOrder) {
    return async (dispatch) => {
        const res = await orderService.updOrder(newOrder)
        const action = { type: 'UPDATE_ORDER', newOrder: res }
        return await dispatch(action)
    }
}