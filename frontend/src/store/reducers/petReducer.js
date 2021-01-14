const initialState = {
  pets: [],
//   filterBy: {
//       type: 'All',
//       searchTxt: '',
//       sortBy: 'name'
//   }
    filterBy: {
        
    }

}

export function petReducer(state = initialState, action) {
  switch (action.type) {
      case 'SET_PETS':
          return { ...state,  filterBy: action.newFilterBy, pets: action.pets }
      case 'DELETE_PET':
          return { ...state, pets: state.pets.filter(item => item._id !== action.petId) }
      case 'UPD_PET':
          let index = state.pets.findIndex(el => el._id === action.newPet._id)
          return { ...state, pets: [...state.pets.slice(0, index), action.newPet, ...state.pets.slice(index + 1)] }
      case 'SAVE_PET':
          console.log({ ...state, pets: [...state.pets, action.newPet] })
          return { ...state, pets: [...state.pets, action.newPet] }
      default:
          return state
  }
}

