test('a blog can have its likes updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]

  const updatedData = { likes: blogToUpdate.likes + 5 }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(blogToUpdate.likes + 5)

  // Verify in database
  const blogsAtEnd = await api.get('/api/blogs')
  const updatedBlog = blogsAtEnd.body.find(b => b.id === blogToUpdate.id)
  expect(updatedBlog.likes).toBe(blogToUpdate.likes + 5)
})
