const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

mongoose.set('useCreateIndex', true);

const api = supertest(app)

const initialUsers = [
    {
        username: "testikäyttäjä",
        name: "Janne Nieminen",
        password: "qwerty123"
    },
    {
        username: "MaRa",
        name: "Martti Ahtisaari",
        password: "salasana"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
  
    const userObject1 = new User(initialUsers[0])
    await userObject1.save()
  
    const userObject2 = new User(initialUsers[1])
    await userObject2.save()
})

test('User with too short password cannot be added', async () => {
    const newUser = {
        username: "testihenkilö",
        name: "Jaakko",
        password: "12"
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
})

test('User with too short username cannot be added', async () => {
    const newUser = {
        username: "mo",
        name: "Jaakko",
        password: "12345"
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
})