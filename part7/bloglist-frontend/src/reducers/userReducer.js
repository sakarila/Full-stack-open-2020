const initialState = {
    username: '',
    password: '',
    user: null
}

const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_USERNAME':
            return {...state, username: action.username }
        case 'SET_PASSWORD':
            return {...state, password: action.password }
        case 'SET_USER':
            return {...state, password:'', user: action.user }
        default: return state
    }
}

export const setUsername = (username) => {
    return {
        type: 'SET_USERNAME',
        username: username
    }
}

export const setPassword = (password) => {
    return {
        type: 'SET_PASSWORD',
        password: password
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user: user
    }
}
export default userReducer