// app.js

const config = require('./utils/config')
const logger = require('./utils/logger')
const listHelper = require('./utils/list_helper') 
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog-lists')
const express = require('express')
const mongoose = require('mongoose')


const app = express()

// Connect to MongoDB
logger.info(`Connecting to MongoDB at ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  })

// Middleware
app.use(express.json())
app.use(middleware.requestLogger)

// Routes
app.use('/api/blogs', blogRouter)

// Unknown endpoint handler
app.use(middleware.unknownEndPoints)

// Error handler
app.use(middleware.errorHandler)

module.exports = app
