const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')

app.use('/api/users', usersRouter)
const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)



const app = express()

// Middleware
app.use(express.json())

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error))

// Routes
app.use('/api/blogs', blogsRouter)

// Start server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
