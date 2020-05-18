import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(likeAnecdote(anecdote.id))
    dispatch(setMessage(`you voted '${anecdote.content}'`))
    setTimeout(() => { dispatch(clearMessage()) }, 5000)
  }



  return (
    <div>
      {anecdotes.filter((anecdote) => anecdote.content.startsWith(filter)).sort((a, b) => (a.votes > b.votes) ? -1 : 1).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList