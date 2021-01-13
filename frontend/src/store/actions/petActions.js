import { petService } from '../../services/petService.js'

export function loadPets(newFilterBy) {
    return async (dispatch) => {
        const pets = await petService.query(newFilterBy)
        const action = {
            type: 'SET_PETS',
            pets,
            newFilterBy
        }
        console.log('action', action)
        return await dispatch(action)
    }
}

export function deletePet(petId) {
    return async (dispatch) => {
        await petService.delPet(petId)
        const action = { type: 'DELETE_PET', petId }
        return await dispatch(action)

    }
}
// export function getPet(petId) {
//     return async (dispatch) => {
//         const pet = await petService.getPet(petId)
//         return pet

//     }
// }

export function savePet(pet) {
    return async (dispatch) => {
        const res = await petService.savePet(pet)
        if (!res) {
            const action = { type: 'UPD_PET', newPet: pet }
            return await dispatch(action)
        } else {
            const action = { type: 'SAVE_PET', newPet: res }
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