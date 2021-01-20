import { orderService } from '../../services/orderService.js'

export function loadOrders(ownerId) {
    return async (dispatch) => {
        const orders = await orderService.query()
        // var orders = allOrders.filter(order => order.pet.host_id === ownerId)
        const action = {
            type: 'SET_ORDERS',
            orders
        }
        return await dispatch(action)
    }
}

export function saveOrder(pet, message) {
    var order = {
        message: message,
        pet: {
            name: pet.name,
            _id: pet._id,
            imgUrls: pet.imgUrls
        },
        ownerId: pet.host._id,
        byUser: {
            _id: '',
            fullname: ''
            // _id: loggedInUser._id,
            // fullname: loggedInUser.fullname
        }
    }
    return async (dispatch) => {
        const res = await orderService.saveOrder(order)
        console.log('SAVE_ORDER')
        const action = { type: 'SAVE_ORDER', newOrder: res }
        return await dispatch(action)
    }
}
export function updOrder(newOrder) {
    return async (dispatch) => {
        const res = await orderService.updOrder(newOrder)
        console.log('UPD_ORDER')
        const action = { type: 'UPD_ORDER', newOrder: res }
        return await dispatch(action)
    }
}