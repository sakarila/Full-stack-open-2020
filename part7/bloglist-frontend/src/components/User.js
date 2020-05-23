import React from 'react'
import { useParams } from "react-router-dom"
import { Table } from 'react-bootstrap'

const User = ({ blogs }) => {
    const id = useParams().id

    if (blogs.length === 0) {
        return null
    }

    const filteredBlogs = blogs.filter(blog => blog.user.id === id)
    const username = blogs.find(blog => blog.user.id === id).user.username

    return (
        <div >
            <h2>{username}</h2>
            <Table striped>
                <tbody>
                    {filteredBlogs.map(blog =>
                        <tr key={blog.id}>
                            <td>
                                {blog.title}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default User