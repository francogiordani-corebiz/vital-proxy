const {
  config: { keys }
} = require('../config')
const { default: axios } = require('axios')

const inventoryBySellerAndSku = (req, res, next) => {
  const {
    params: { seller, sku }
  } = req
  axios
    .get(
      `https://${seller}.myvtex.com/api/logistics/pvt/inventory/skus/${sku}`,
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
      if (err.response) {
        res.status = err.response.status
        res.end(err.response.statusText)
        return
      }

      res.status(500)
      res.end('Internal server error')
    })
}

module.exports = { inventoryBySellerAndSku }
