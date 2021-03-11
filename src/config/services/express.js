'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const whitelist = /.*vital.*\.([a-zA-Z]*)([vtex]*)([a-zA-Z]*)(\.*)com(\.*)([br]*)([ar]*)$/
const corsOptions = {
  credentials: true,
  origin: whitelist
}

/**
 * Express configuration
 * @function
 */
const init = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(cors(corsOptions))
  app.use(helmet())
  return app
}

module.exports = {
  init
}
