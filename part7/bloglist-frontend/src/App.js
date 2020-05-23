import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Table } from 'react-bootstrap'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import UsersList from './components/UsersList'
import User from './components/User'
import BlogView from './components/BlogView'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import {setUser, setUsername, setPassword} from './reducers/userReducer'
import { setBlogs } from './reducers/blogReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setUser(user))
  },[dispatch])

  const notifyWith = (message, messageType='success') => {
    dispatch(setNotification(message, messageType))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = user.username
    const password = user.password
    try {
      const user = await loginService.login({
        username, password
      })
      console.log(user)

      dispatch(setUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      dispatch(setBlogs(blogs.concat(newBlog)))
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    dispatch(setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b)))
  }

  const handleRemove = async (id, history) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      history.push('/')
      dispatch(setBlogs(blogs.filter(b => b.id !== id)))
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    storage.logoutUser()
  }

  if ( !user.user ) {
    return (
      <div className="container">
        <h2>login to application</h2>
        <Notification notification={notification} />
        <Form onSubmit={handleLogin}>
          <Form.Group>
              <Form.Label>username:</Form.Label>
              <Form.Control
                type="text"
                id='username'
                value={user.username}
                onChange={({ target }) => dispatch(setUsername(target.value))}
              />
            <Form.Label>password:</Form.Label>
              <Form.Control
                id='password'
                type='password'
                value={user.password}
                onChange={({ target }) => dispatch(setPassword(target.value))}
              />
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <Router>
      <div className="container">
        <Notification notification={notification} />

        <div>
        <Link to="/">blogs  </Link>
        <Link to="/users">users  </Link>
          {user.user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        <h2>blog app</h2>
        <Switch>
          <Route path="/users/:id">
            <User blogs={blogs} />
          </Route>
          <Route path="/users">
            <h2>Users</h2>
            <h3>blogs created</h3>
            <Table striped>
              <tbody>
                {blogService.getUserBlogs(blogs).map(blog => 
                  <tr key={blog[0]}>
                    <td>
                      <UsersList key={blog[0]} username={blog[0]} blogs={blog[1]} />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

          </Route>
          <Route path="/blogs/:id">
            <BlogView blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
          </Route>
          <Route path="/">
            <h2>Blogs</h2>
            <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>
            <Table striped>
              <tbody>
                {blogs.sort(byLikes).map(blog =>
                  <tr key={blog.id}>
                    <td>
                      <Blog
                        key={blog.id}
                        blog={blog}
                        handleLike={handleLike}
                        handleRemove={handleRemove}
                        own={user.username===blog.user.username}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App