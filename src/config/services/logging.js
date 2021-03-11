'use strict'
const fs = require('fs')
const winston = require('winston')

/**
 * Create log folder
 */
const dirpath = './log'
fs.mkdirSync(dirpath, { recursive: true })

/**
 * Logging configuration (winston)
 */
const show = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'log/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'log/combined.log'
    })
  ]
})

if (process.env.NODE_ENV !== 'test') {
  show.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}

module.exports = show
