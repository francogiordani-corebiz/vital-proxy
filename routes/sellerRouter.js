'use strict'

const express = require('express')
const api = require('../src/api')
const router = express.Router()

const apicache = require('apicache')
const cache = apicache.middleware

router.get('/promociones/', cache('30 minutes'), api.promotionsBySeller)
router.get('/inventory/:sku', cache('30 minutes'), api.inventoryBySellerAndSku)

module.exports = router
