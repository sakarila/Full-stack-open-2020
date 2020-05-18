const notificationReducer = (state='', action) => {
    switch(action.type) {
        case 'SET_MESSAGE':
            return action.message
        case 'CLEAR_MESSAGE':
            return ''
        default: return state
    }
}

export const setMessage = (message) => {
    return {
        type: 'SET_MESSAGE',
        message: message
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        await dispatch(setMessage(message))
        setTimeout(() => { dispatch(clearMessage()) }, time * 1000)
    }
}

export const clearMessage = () => {
    return {
        type: 'CLEAR_MESSAGE'
    }
}

export default notificationReducer