// tests/test_helper.js
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'http://test.com' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

// Generate unique username to avoid conflicts between tests
const generateUniqueUsername = () => {
  return `testuser${Date.now()}${Math.floor(Math.random() * 1000)}`
}

let currentTestUser = null

const createTestUser = async () => {
  const passwordHash = await bcrypt.hash('secret', 10)
  const username = generateUniqueUsername()
  
  const user = new User({
    username,
    name: 'Test User',
    passwordHash,
  })

  currentTestUser = await user.save()
  return currentTestUser
}

const getValidToken = async () => {
  if (!currentTestUser) {
    currentTestUser = await createTestUser()
  }

  const userForToken = {
    username: currentTestUser.username,
    id: currentTestUser._id,
  }

  return jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  createTestUser,
  getValidToken
}