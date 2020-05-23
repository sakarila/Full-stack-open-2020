const notificationReducer = (state=null, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return {message: action.message, messageType: action.messageType}
        case 'CLEAR_NOTIFICATION':
            return null
        default: return state
    }
}

export const setNotification = (message, messageType) => {
    console.log(message)
    return {
        type: 'SET_NOTIFICATION',
        message: message,
        messageType: messageType
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer