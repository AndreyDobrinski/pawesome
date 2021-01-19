const initialState = {
    isDarkMode: false,
}

export function appSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case 'IS_DARK':
            return { ...state, isDarkMode: !state.isDarkMode}
        default:
            return state
    }
}

