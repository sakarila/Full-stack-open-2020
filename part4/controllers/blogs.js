const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs.map(blog => blog.toJSON()))
  })

blogsRouter.post('/', async (request, response) => {
    if (typeof request.body.title === 'undefined' && typeof request.body.url === 'undefined') {
      response.status(400).end()
    } else {

      if (typeof request.body.likes === 'undefined') {
        request.body.likes = 0
      }
      const token = request.token
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await User.findById(decodedToken.id)

      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
      })

      const newBlog = await blog.save()
      user.blogs = user.blogs.concat(newBlog._id)
      await user.save()

      response.status(201).json(newBlog.toJSON())
    }
})

blogsRouter.delete('/:id', async (request, response) => {

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog =await Blog.findById(request.params.id)

  if ( blog.user.toString() === user._id.toString() ) {
    await blog.delete()
    response.status(204).end()
  } else {
    return response.status(400).json({ error: 'Not authorized' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.status(200).json(updatedBlog.toJSON())
})


module.exports = blogsRouter