import React from 'react'
import { Link } from "react-router-dom"

const UsersList = ({username, blogs}) => {
    console.log(username)
    console.log(blogs)
  return (
    <div >
         <Link to={`/users/${blogs[0].user.id}`}>{username} </Link>{blogs.length}
    </div>
  )
}

export default UsersList