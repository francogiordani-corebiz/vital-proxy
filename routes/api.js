'use strict'

const express = require('express')
const api = require('../src/api')
const router = express.Router()
const apicache = require('apicache')

const cache = apicache.middleware

const { verifySeller } = require('../src/middlewares')

// const sellerRouter = require('./sellerRouter')

router.get('/ping', api.ping)

router.get(
  '/seller/:seller/promotions',
  cache('30 minutes'),
  verifySeller,
  api.promotionsBySeller
)
router.use(
  '/seller/:seller/inventory/:sku',
  verifySeller,
  cache('15 minutes'),
  api.inventoryBySellerAndSku
)
router.all('/seller/:seller/api/*', verifySeller, api.handler)

module.exports = router
