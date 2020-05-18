import anecdoteService from '../services/anecdote'

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}

export const likeAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.addLike(id)
    dispatch({
      type: 'LIKE',
      data: {
        id: id
      }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: data
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'LIKE':
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : {...anecdote, votes: anecdote.votes + 1})
    case 'CREATE_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export default anecdoteReducer