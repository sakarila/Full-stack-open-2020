import React from 'react'
import { connect } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.likeAnecdote(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes.filter((anecdote) => anecdote.content.startsWith(props.filter)).sort((a, b) => (a.votes > b.votes) ? -1 : 1).map(anecdote =>
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

const mapStateToProps = (state) => {
    console.log(state)
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    }
  }

const mapDispatchToProps = {
    likeAnecdote,
    setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList