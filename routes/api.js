'use strict'

const express = require('express')
const api = require('../src/api')
const router = express.Router()
const apicache = require('apicache')

const cache = apicache.middleware

const { verifySeller } = require('../src/middlewares')

// const sellerRouter = require('./sellerRouter')

router.get('/ping', api.ping)

router.get('/polygon/:addressId', api.getPolygonAroundAddress)

router.get(
  '/seller/:seller/promotions',
  cache('24 hours'),
  verifySeller,
  api.promotionsBySeller
)
router.post('/cache/promotions/update', api.updatePromotions)
router.use(
  '/seller/:seller/inventory/:sku',
  verifySeller,
  cache('15 minutes'),
  api.inventoryBySellerAndSku
)
router.all('/seller/:seller/api/*', verifySeller, api.handler)

module.exports = router
