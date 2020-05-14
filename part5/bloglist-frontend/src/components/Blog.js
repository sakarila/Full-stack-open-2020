import React, { useState } from 'react'

const Blog = ({ blog, username, addLike, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

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

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const showDeleteButton = { display: blog.user.username === username ? '' : 'none' }

  return (
    <div className='blog-post' style={blogStyle}>
      <div className='basicInfo'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{detailsVisible ? 'hide' : 'view'}</button>
      </div>
      <div id="extra-info" style={showWhenVisible} className='extraInfo' >
        {blog.url}
        <br/>
        Likes: {blog.likes} <button className={'likeButton'} onClick={addLike}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        <button style={showDeleteButton} className={'deleteButton'} onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
