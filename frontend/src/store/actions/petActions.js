import { petService } from '../../services/petService.js'

export function loadPets(newFilterBy) {
    console.log('petActions... --- filterBy --- ', newFilterBy)
    return async (dispatch) => {
        try {
            dispatch({type:'SET_IS_LOADING' , isLoading: true})
            
            const pets = await petService.query(newFilterBy)
            const action = {
                type: 'SET_PETS',
                pets,
                newFilterBy
            }
            await dispatch(action)
            dispatch({type:'SET_IS_LOADING' , isLoading: false})
            
        } catch (err) {
            // console.log('action', action)

        }
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

// export function setFilter(newFilterBy) {
//     return (dispatch) => {
//         return petService.getPetsForDisplay(newFilterBy)
//             .then((petsForDisplay) => {
//                 const action = { type: 'UPDATE_FILTER', newPets: petsForDisplay, newFilterBy }
//                 dispatch(action)
//             })
//     }
// }