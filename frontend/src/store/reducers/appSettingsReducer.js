const initialState = {
    isDarkMode: false,
    isLoading:false
}

export function appSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case 'IS_DARK':
            return { ...state, isDarkMode: !state.isDarkMode}
        case 'SET_IS_LOADING':
            return { ...state, isLoading: action.isLoading}
        default:
            return state
    }
}

