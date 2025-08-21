describe('most likes', () => {
  const listWithMultipleBlogs = [
    { title: 'Blog 1', author: 'Alice', likes: 5 },
    { title: 'Blog 2', author: 'Bob', likes: 3 },
    { title: 'Blog 3', author: 'Alice', likes: 8 },
    { title: 'Blog 4', author: 'Charlie', likes: 2 },
    { title: 'Blog 5', author: 'Alice', likes: 1 },
    { title: 'Blog 6', author: 'Bob', likes: 7 }
  ]

  test('returns author with most total likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.deepStrictEqual(result, { author: 'Alice', likes: 14 })
  })

  test('when list is empty, returns null', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })

  test('when multiple authors tie, returns one of them', () => {
    const tieList = [
      { title: 'Blog 1', author: 'Alice', likes: 5 },
      { title: 'Blog 2', author: 'Bob', likes: 8 },
      { title: 'Blog 3', author: 'Alice', likes: 3 },
      { title: 'Blog 4', author: 'Bob', likes: 0 }
    ]
    const result = listHelper.mostLikes(tieList)
    // Either Alice or Bob is acceptable
    assert.ok(result.author === 'Alice' || result.author === 'Bob')
    assert.strictEqual(result.likes, 8)
  })
})
