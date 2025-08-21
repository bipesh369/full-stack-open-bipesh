const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  // Add one existing user for uniqueness test
  await api.post('/api/users').send({
    username: 'existingUser',
    name: 'Existing User',
    password: 'password123'
  })
})

test('username must be at least 3 characters', async () => {
  const newUser = {
    username: 'ab',
    name: 'Short User',
    password: 'validpass'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(response.body.error).toContain('username must be at least 3 characters long')
})

test('password must be at least 3 characters', async () => {
  const newUser = {
    username: 'validusername',
    name: 'Short Password',
    password: '12'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(response.body.error).toContain('password must be at least 3 characters long')
})

test('username must be unique', async () => {
  const newUser = {
    username: 'existingUser',
    name: 'Duplicate User',
    password: 'validpassword'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(response.body.error).toContain('username must be unique')
})

afterAll(async () => {
  await mongoose.connection.close()
})
