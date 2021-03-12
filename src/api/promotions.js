/* eslint-disable no-prototype-builtins */
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
    res.status(400)
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
      const promosBySku = {}

      data.items.forEach((promo) => {
        const skus = promo.generalValues?.skus
        if (skus) {
          skus.split(',').forEach((sku) => {
            // add promotion to array by sku, if the sku doesnt exist yet, add that as a property
            const promoValue = {
              sku,
              ...promo,
              generalValues: {
                Cucarda: promo.generalValues.Cucarda,
                CdPromo: promo.generalValues.CdPromo
              }
            }
            if (promosBySku.hasOwnProperty(sku)) {
              promosBySku[sku].push(promoValue)
            } else {
              promosBySku[sku] = [promoValue]
            }
          })
        }
      })
      res.json(promosBySku)
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
const promotionsBySku = (req, res, next) => {
  res.end('Not implemented')
}

module.exports = { promotionsBySku, promotionsBySeller }
