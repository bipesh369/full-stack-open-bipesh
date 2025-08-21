const listHelper = require('../utils/list_helper')

const blogs = [ /* your blog array */ ]

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})
