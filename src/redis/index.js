const Redis = require('ioredis')
const { show } = require('../config')

const client = new Redis()
show.debug('Redis client online')

const init = (options) => {}

const close = () => {
  client.disconnect()
  show.info('Redis client offline')
}

module.exports = { init, close, client }
