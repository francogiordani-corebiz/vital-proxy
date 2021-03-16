'use strict'

const express = require('express')
const api = require('../src/api')
const router = express.Router()

const apicache = require('apicache')
const verifySeller = require('../src/middlewares/verifySeller')
const cache = apicache.middleware

router.get('/ping', api.ping)
router.get('/cache/performance', (req, res) => {
  res.json(cache.getPerformance())
})
router.get(
  '/promociones/:seller',
  cache('30 minutes'),
  verifySeller,
  api.promotionsBySeller
)
router.get(
  '/inventory/:seller/:sku',
  cache('30 minutes'),
  verifySeller,
  api.inventoryBySellerAndSku
)

module.exports = router
