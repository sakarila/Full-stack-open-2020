import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdotes, votes}) => {
    const maxVotes = Math.max(...votes)
    const indexOfMaxValue = votes.indexOf(maxVotes);
    if ( maxVotes === 0 ) {
      return (
        <p>There are no votes submitted</p>
      )
    }
    return (
      <div>
        <p>{anecdotes[indexOfMaxValue]}</p>
        <p>Has {maxVotes} votes</p>
      </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(6).fill(0));


  const nextAnecdote = () => {
    setSelected([Math.floor(Math.random() * props.anecdotes.length)])
  }

  const voteAnecdote  = () => {
    const copy = [...votes ]
    copy[selected] += 1
    setVotes(copy);
    console.log(votes)
  }  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <button onClick={ nextAnecdote }>next anecdote</button>
      <button onClick={ voteAnecdote }>vote anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
