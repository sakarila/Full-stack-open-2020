  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const [birthYear, setBirthYear] = useState('')
  const [author, setAuhtor] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [ setBirth ] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    
    const year = parseInt(birthYear)
    setBirth({ variables: { name: author, setBornTo: year } })

    setBirthYear('')
    setAuhtor('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='born'
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
      </div>
    </div>
  )
}

export default Authors
