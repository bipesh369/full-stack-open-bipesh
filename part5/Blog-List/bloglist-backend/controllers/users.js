const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

// GET all users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  res.json(users)
})

// POST create a new user
usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name,
    username,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
