'use strict'

/**
 * Error handler
 */
const handle = (err, req, res, next) => {
  res.status(err.status || 500)

  next()
}

module.exports = {
  handle
}
