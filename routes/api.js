'use strict'

const express = require('express')
const api = require('../src/api')
const router = express.Router()
const apicache = require('apicache')

const cache = apicache.middleware

const { verifySeller } = require('../src/middlewares')

// Are we alive? What if god was one of us?
router.get('/ping', api.ping)

// Get all promos and offers available in a certain seller
router.get(
  '/seller/:seller/promotions',
  cache('15 minutes'),
  verifySeller,
  api.promotionsBySeller
)

// Receive offers in a .csv file
router.post('/cache/promotions/update', api.updatePromotions)

// Get inventory of product by seller
router.use(
  '/seller/:seller/inventory/:sku',
  verifySeller,
  cache('15 minutes'),
  api.inventoryBySellerAndSku
)

// General API proxy
router.all('/seller/:seller/api/*', verifySeller, api.handler)

module.exports = router
