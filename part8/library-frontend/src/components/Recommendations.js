import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client';
import { RECOMMENDED_BOOKS } from '../queries'

const Recommendations = (props) => {
  const [getRecommendedBooks, result] = useLazyQuery(RECOMMENDED_BOOKS)

  useEffect(() => {
    if (props.token) {
        console.log("useEffect if-haara")
        getRecommendedBooks()
    } else {
        console.log("useEffect else-haara")
    }
  }, [props.token])

  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.recommendedBooks

  return (
    <div>
      <h2>recommendations</h2>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations