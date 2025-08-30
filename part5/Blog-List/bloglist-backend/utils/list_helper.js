const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((max, blog) => 
    blog.likes > max.likes ? blog : max
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(_.keys(blogCounts), (author) => blogCounts[author])

  return {
    author: topAuthor,
    blogs: blogCounts[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = _(blogs)
    .groupBy('author')
    .mapValues((authorBlogs) => _.sumBy(authorBlogs, 'likes'))
    .value()

  const topAuthor = _.maxBy(_.keys(likesByAuthor), (author) => likesByAuthor[author])

  return {
    author: topAuthor,
    likes: likesByAuthor[topAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}