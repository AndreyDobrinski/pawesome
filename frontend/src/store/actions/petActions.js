import { petService } from '../../services/petService.js'

export function loadPets(newFilterBy) {
    console.log('petActions... --- filterBy --- ', newFilterBy)
    return async (dispatch) => {
        const pets = await petService.query(newFilterBy)
        const action = {
            type: 'LOAD_PETS',
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
        const res = await petService.save(pet)
        const action = { type: 'SAVE_PET', newPet: res }
        return await dispatch(action)
    }
}

export function setFilter(filterBy) {
    console.log('Actions... setFilter... filter ', filterBy)
    return (dispatch) => {
        const action = {
            type: 'SET_FILTER',
            filterBy
        }
        dispatch(action)
    }
}