import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setTitle, setAuthor, setUrl, clearForm} from '../reducers/blogFormReducer'

const NewBlog = (props) => {
  const dispatch = useDispatch()
  const blogForm = useSelector(state => state.blogForm)

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title: blogForm.title, author: blogForm.author, url: blogForm.url
    })

    dispatch(clearForm())
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input
            id='author'
            value={blogForm.author}
            onChange={({ target }) => dispatch(setAuthor(target.value))}
          />
        </div>
        <div>
          title
          <input
            id='title'
            value={blogForm.title}
            onChange={({ target }) => dispatch(setTitle(target.value))}
          />
        </div>
        <div>
          url
          <input
            id='url'
            value={blogForm.url}
            onChange={({ target }) => dispatch(setUrl(target.value))}
          />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )
}

export default NewBlog