const { userExtractor, tokenExtractor } = require('../utils/middleware')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

// Apply tokenExtractor for all blog routes
blogsRouter.use(tokenExtractor)


// Use tokenExtractor for all routes
blogsRouter.use(tokenExtractor)

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body

  if (!body.title || !body.url) {
    return res.status(400).json({ error: 'title or url missing' })
  }

  if (body.likes === undefined) body.likes = 0

  const user = req.user
  const blog = new Blog({
    ...body,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  res.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).end()
  }

  if (blog.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ error: 'only the creator can delete the blog' })
  }

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})
