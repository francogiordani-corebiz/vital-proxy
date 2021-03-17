'use strict'

const express = require('express')
const api = require('../src/api')
const router = express.Router()

const verifySeller = require('../src/middlewares/verifySeller')

// const sellerRouter = require('./sellerRouter')

router.get('/ping', api.ping)

router.use('/seller/:seller/promotions', verifySeller, api.promotionsBySeller)
router.use(
  '/seller/:seller/inventory/:sku',
  verifySeller,
  api.inventoryBySellerAndSku
)
router.all('/seller/:seller/api/*', verifySeller, api.handler)

module.exports = router
