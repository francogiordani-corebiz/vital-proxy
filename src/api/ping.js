/**
 * ping
 */
const ping = (req, res, next) => {
  res.end('pong')
}

module.exports = { ping }
