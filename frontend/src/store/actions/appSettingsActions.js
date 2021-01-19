
export function toggleDarkMode() {
    return dispatch => {
        console.log('Im dark!');
        dispatch({ type: 'IS_DARK' })

    }
}