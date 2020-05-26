
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

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

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allPersons : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded.title
      window.alert(`New book: ${addedBook} added!`)
      updateCacheWith(addedBook)
    }
  })

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
        show={page === 'add'} updateCacheWith={updateCacheWith}
      />

    </div>
  )
}

export default App