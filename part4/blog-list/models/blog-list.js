const mongoose = require('mongoose')


const newSchema = mongoose.Schema({
  title: String,
  author: String,

})

const Blog = new mongoose.model('Blog',newSchema)

module.exports = Blog// PUT /api/blogs/:id
blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )

  if (updatedBlog) {
    res.json(updatedBlog)
  } else {
    res.status(404).end()
  }
})
