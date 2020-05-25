
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client' 

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
    setPage('books')
  }

  console.log(page)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={token ? {display: 'none'} : {}} onClick={() => setPage('login')}>login</button>
        <button style={!token ? {display: 'none'} : {}} onClick={() => setPage('add')}>add book</button>
        <button style={!token ? {display: 'none'} : {}} onClick={() => setPage('recommendations')}>recommend</button>
        <button style={!token ? {display: 'none'} : {}} onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <LoginForm
        show={page === 'login'} setToken={setToken} setPage={setPage}
      />

      <Recommendations 
        show={page === 'recommendations'} token={token}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App