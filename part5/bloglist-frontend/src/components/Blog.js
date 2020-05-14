import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, username }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const addLike = () => {
    blog.likes = blog.likes + 1
    blogService.updateBlog(blog)
    setLikes(likes + 1)
  }

  const deleteBlog = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(x => x.id !== blog.id))
    }
  }

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const showDeleteButton = { display: blog.user.username === username ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div className='basicInfo'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{detailsVisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className='extraInfo' >
        {blog.url}
        <br/>
        Likes: {likes} <button onClick={addLike}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        <button style={showDeleteButton} onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
