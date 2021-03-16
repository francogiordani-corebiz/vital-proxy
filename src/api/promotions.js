/* eslint-disable no-prototype-builtins */
const {
  config: { keys }
} = require('../config')
const { default: axios } = require('axios')

const promotionsBySeller = (req, res, next) => {
  const {
    params: { seller }
  } = req

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
              idCalculatorConfiguration: promo.idCalculatorConfiguration,
              isActive: promo.isActive,
              description: promo.description,
              type: promo.type,
              status: promo.status,
              generalValues: {
                Cucarda: promo.generalValues.Cucarda,
                CdPromo: promo.generalValues.CdPromo
              }
            }
            if (!promosBySku.hasOwnProperty(sku) && promo.isActive) {
              promosBySku[sku] = []
            }
            if (promo.isActive) {
              promosBySku[sku].push(promoValue)
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
