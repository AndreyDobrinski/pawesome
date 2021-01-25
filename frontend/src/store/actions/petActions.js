import { petService } from '../../services/petService.js'

export function loadPets(newFilterBy) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_IS_LOADING', isLoading: true })

            const pets = await petService.query(newFilterBy)
            const action = {
                type: 'LOAD_PETS',
                pets,
                newFilterBy
            }
            await dispatch(action)
            dispatch({ type: 'SET_IS_LOADING', isLoading: false })

        } catch (err) {
            console.log('error load pets', err)

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

export function savePet(pet) {
    return async (dispatch) => {
        const res = await petService.save(pet)
        const action = { type: 'SAVE_PET', newPet: res }
        return await dispatch(action)
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        const action = {
            type: 'SET_FILTER',
            filterBy
        }
        dispatch(action)
    }
}