import React from 'react'
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>
        <i>{blog.title}</i>  {blog.author}
      </Link>
    </div>
  )
}

export default Blog