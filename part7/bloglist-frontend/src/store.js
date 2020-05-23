
import { createStore, combineReducers} from 'redux'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import blogFormReducer from './reducers/blogFormReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    user: userReducer,
    blogForm: blogFormReducer,
    notification: notificationReducer
  })

const store = createStore(reducer)

export default store