const initialState = {
    pets: [],
    filterBy: {
        kind: 'all',
        age: 'all',
        gender: 'all',
        location: 'all',
        sortBy: 'likes'
    }

}

export function petReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PETS':
            return { ...state, filterBy: action.newFilterBy, pets: action.pets }
        case 'DELETE_PET':
            return { ...state, pets: state.pets.filter(item => item._id !== action.petId) }
        case 'UPD_PET':
            let index = state.pets.findIndex(pet => pet._id === action.newPet._id)
            return { ...state, pets: [...state.pets.slice(0, index), action.newPet, ...state.pets.slice(index + 1)] }
        case 'SAVE_PET':
            console.log({ ...state, pets: [...state.pets, action.newPet] })
            let idx = state.pets.findIndex(pet => pet._id === action.newPet._id)
            return (idx === -1) ? { ...state, pets: [...state.pets, action.newPet] } :
            { ...state, pets: [...state.pets.slice(0, idx), action.newPet, ...state.pets.slice(idx + 1)] }
        case 'SET_FILTER':
            console.log('SET FILTER ', action.filterBy)
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}

