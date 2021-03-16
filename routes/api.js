'use strict'

const express = require('express')
const api = require('../src/api')
const router = express.Router()

const apicache = require('apicache')
const cache = apicache.middleware

router.get('/ping', api.ping)
router.get('/cache/performance', (req, res) => {
  res.json(cache.getPerformance())
})
router.get('/promociones/:seller', cache('30 minutes'), api.promotionsBySeller)
router.get('/inventory/:seller/:sku', api.inventoryBySellerAndSku)

module.exports = router
