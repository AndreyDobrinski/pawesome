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

export function saveOrder(pet) {
    return async (dispatch) => {
        const res = await orderService.saveOrder(pet)
        if (!res) {
            const action = { type: 'UPD_ORDER', newPet: pet }
            return await dispatch(action)
        } else {
            const action = { type: 'SAVE_ORDER', newPet: res }
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