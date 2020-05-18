import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))

    dispatch(setMessage(`you created '${content}'`))
    setTimeout(() => { dispatch(clearMessage()) }, 5000)
  }

  return (
    <div>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default AnecdoteList