import React from 'react'
import { useParams, useHistory } from "react-router-dom"

const BlogView = ({ blogs, handleLike, handleRemove, user }) => {
    const id = useParams().id
    const history = useHistory()

    if (blogs.length === 0 ) {
        return null
    }
    if (!user) {
        return null
    }
    const blog = blogs.find(blog => blog.id === id)
    const own = user.user.username === blog.user.username
    return (
        <div>
        <div>
            <h2>{blog.title} {blog.author}</h2>
        </div>
            <div>
            <div> <a href={blog.url}>{blog.url}</a></div>
            <div>likes {blog.likes}
                <button onClick={() => handleLike(blog.id)}>like</button>
            </div>
            <div>added by {blog.user.name}</div>
            {own&&<button onClick={() => handleRemove(blog.id, history)}>remove</button>}
            </div>
        </div>
    )
}

export default BlogView