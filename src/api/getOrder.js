const {
  config: { keys }
} = require('../config')
const { default: axios } = require('axios')

const getOrder = (req, res) => {
  const {
    params: { orderId }
  } = req
  axios
    .get(`https://arvitalqa.myvtex.com/api/oms/pvt/orders/${orderId}`, {
      headers: {
        'X-VTEX-API-AppKey': keys.testing.appKey,
        'X-VTEX-API-AppToken': keys.testing.appToken
      }
    })
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

const getOrders = (req, res) => {
  const { query } = req
  axios
    .get('https://arvitalqa.myvtex.com/api/oms/pvt/orders', {
      headers: {
        'X-VTEX-API-AppKey': keys.testing.appKey,
        'X-VTEX-API-AppToken': keys.testing.appToken
      },
      params: query
    })
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

module.exports = { getOrder, getOrders }
