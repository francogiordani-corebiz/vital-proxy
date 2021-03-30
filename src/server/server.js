'use strict'

const { config, express, show, stats } = require('../config')
const http = require('http')
const routes = require('../../routes')

const redis = require('../redis')

let server = null

/**
 * Start HTTP/2 server, database, socket.io connection
 * Load routes, services, check memory usage
 * @function
 */
const listen = () => {
  const app = express.init()
  server = http.createServer(app).listen(config.port, config.ip)
  show.debug(`Listening at http://${config.host}:${config.port}`)
  redis.init()
  routes.init(app)
  stats.memory()
}

/**
 * Close server, database connection
 * @function
 */
const close = () => {
  server.close()
  show.debug('Server down')
}

module.exports = {
  listen,
  close
}
