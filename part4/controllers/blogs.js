const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

blogsRouter.post('/', async (request, response) => {
    if (typeof request.body.title === 'undefined' && typeof request.body.url === 'undefined') {
      response.status(400).end()
    } else {

      if (typeof request.body.likes === 'undefined') {
        request.body.likes = 0
      }
      const blog = new Blog(request.body)
    
      const newBlog = await blog.save()
      response.status(201).json(newBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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