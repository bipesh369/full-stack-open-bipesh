const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')

// DELETE /api/blogs/:id
blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end() // 204 = No Content, RESTful convention
  } catch (error) {
    res.status(400).json({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter
