import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState("Programming")
  const [getBooks, resultBooks] = useLazyQuery(ALL_BOOKS)
  const [getGenres, resultGenres] = useLazyQuery(ALL_GENRES)

  useEffect(() => {
    getBooks()
    getGenres()
  }, [])

  if (!props.show) {
    return null
  }

  if (resultBooks.loading || resultGenres.loading)  {
    return <div>loading...</div>
  }

  const books = resultBooks.data.allBooks
  console.log(books)
  const genres = resultGenres.data.allGenres

  const changeGenre = (event) => {
    setGenre(event.target.value)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter((book) => book.genres.find((bookGenre) => bookGenre === genre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <select value={genre} onChange={changeGenre}>
          {genres.map(genre =>
            <option key={genre} value={genre}>{genre}</option>
          )}
      </select>
    </div>
  )
}

export default Books