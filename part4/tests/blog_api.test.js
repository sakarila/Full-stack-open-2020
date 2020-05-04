const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
      title: 'Testailua',
      author: 'Matti Keränen',
      url: 'http://www.google.com',
      likes: 5,
    },
    {
        title: 'Fullstack course',
        author: 'Kalle Hietanen',
        url: 'http://www.wikipedia.com',
        likes: 22,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
    }
]
  
beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObject1 = new Blog(initialBlogs[0])
    await blogObject1.save()
  
    const blogObject2 = new Blog(initialBlogs[1])
    await blogObject2.save()

    const blogObject3 = new Blog(initialBlogs[2])
    await blogObject3.save()
})

test('blogs are returned as json and correct amount of blogs are returned', async () => {
  await api.get('/api/blogs')
    .expect('Content-Type', /application\/json/)
    .expect(response => {
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(initialBlogs.length)
    })
})

test('unique identifier of the blog posts are named "id"', async () => {
    await api.get('/api/blogs')
    .expect(response => {
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Testailua part 2',
        author: 'Matti Keränen',
        url: 'http://www.facebook.com',
        likes: 13
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(blog => blog.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
        'Testailua part 2'
    )
  })

test('if the "likes" property is missing from the request, it will default to 0', async () => {
    const newBlog = {
        title: 'Testailua part 2',
        author: 'Matti Keränen',
        url: 'http://www.facebook.com'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const likes = response.body.map(blog => blog.likes)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(likes).toContain(0)
})

test('if the "title" and "url" properties are missing from the request, backend reponds with 400 status code', async () => {
    const newBlog = {
        author: 'Matti Keränen',
        likes: 13
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})