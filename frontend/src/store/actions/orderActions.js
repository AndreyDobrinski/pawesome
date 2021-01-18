import { orderService } from '../../services/orderService.js'

export function loadOrders(ownerId) {
    return async (dispatch) => {
        const allOrders = await orderService.query()
        var orders = allOrders.filter(order => order.pet.host_id === ownerId)
        const action = {  
            type: 'SET_ORDERS',
            orders
        }
        return await dispatch(action)
    }
}

// export function deletePet(petId) {
//     return async (dispatch) => {
//         await petService.delPet(petId)
//         const action = { type: 'DELETE_PET', petId }
//         return await dispatch(action)

//     }
// }
// export function getPet(petId) {
//     return async (dispatch) => {
//         const pet = await petService.getPet(petId)
//         return pet

//     }
// }

export function saveOrder(order) {
    return async (dispatch) => {
        const res = await orderService.saveOrder(order)
        if (!res) {
            console.log('RIGHT!')
            const action = { type: 'UPD_ORDER', newOrder: order }
            return await dispatch(action)
        } else {
            const action = { type: 'SAVE_ORDER', newOrder: res }
            return await dispatch(action)
        }
    }
}


// export function setFilter(newFilterBy) {
//     return (dispatch) => {
//         return petService.getPetsForDisplay(newFilterBy)
//             .then((petsForDisplay) => {
//                 const action = { type: 'UPDATE_FILTER', newPets: petsForDisplay, newFilterBy }
//                 dispatch(action)
//             })
//     }
// }