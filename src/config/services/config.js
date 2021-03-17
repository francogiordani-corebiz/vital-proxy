'use strict'

const path = require('path')
let basePath = path.join(__dirname, '../../../')
const env = process.env.NODE_ENV
if (env === 'production') {
  basePath = './'
}
const envPath = path.join(basePath, `.env/${env}.config.env`)
const envConfig = require('dotenv').config({
  path: envPath
})
if (envConfig.error) {
  throw envConfig.error
}

const keys = {
  main: {
    appKey: process.env.ARVITALQA_APPKEY,
    appToken: process.env.ARVITALQA_APPTOKEN
  },
  arvitalqa: {
    appKey: process.env.ARVITALQA_APPKEY,
    appToken: process.env.ARVITALQA_APPTOKEN
  },
  arvitalqalh: {
    appKey: process.env.ARVITALQALH_APPKEY,
    appToken: process.env.ARVITALQALH_APPTOKEN
  },
  arvitalqatr: {
    appKey: process.env.ARVITALQATR_APPKEY,
    appToken: process.env.ARVITALQATR_APPTOKEN
  }
}

/**
 * Test config
 */
const test = {
  env,
  ip: process.env.IP,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`
}

/**
 * Development config
 */
const development = {
  env,
  ip: process.env.IP,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  keys
}

/**
 * Production config
 */
const production = {
  env,
  ip: process.env.IP,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `https://${process.env.HOST}:${process.env.PORT}`,
  keys
}

const config = {
  test,
  development,
  production
}

module.exports = config[env]
