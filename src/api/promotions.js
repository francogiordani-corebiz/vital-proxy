const {
  config: { keys }
} = require('../config')
const { default: axios } = require('axios')

const allowedSellers = ['arvitalqalh', 'arvitalqatr']

const promotionsBySeller = (req, res, next) => {
  const {
    params: { seller }
  } = req
  if (allowedSellers.indexOf(seller) === -1) {
    res.status = 400
    res.end('Seller not found')
  }

  axios
    .get(
      `https://${seller}.myvtex.com/api/rnb/pvt/benefits/calculatorconfiguration`,
      {
        headers: {
          'X-VTEX-API-AppKey': keys[seller].appKey,
          'X-VTEX-API-AppToken': keys[seller].appToken
        }
      }
    )
    .then(({ data }) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
      if (err) {
        res.status = err.response.status
        res.end(err.response.statusText)
      }
    })
}
const promotionsBySku = (req, res, next) => {
  res.end('Not implemented')
}

module.exports = { promotionsBySku, promotionsBySeller }
