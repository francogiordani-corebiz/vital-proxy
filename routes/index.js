'use strict'

const api = require('./api')
const errorRoute = require('./error')

/**
 * Initializing routes
 */
const init = (app) => {
  app.use('/api', api)
  app.use('*', errorRoute)
}

module.exports = {
  init
}
