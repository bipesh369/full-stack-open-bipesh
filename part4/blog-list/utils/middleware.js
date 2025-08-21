const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization') // Read Authorization header
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7) // Strip "Bearer "
  } else {
    request.token = null
  }
  next() // Pass control to next middleware
}

module.exports = {
  tokenExtractor
}
