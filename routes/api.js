'use strict'

const express = require('express')
const api = require('../src/api')
const router = express.Router()

router.get('/ping', api.ping)
router.get('/promociones/:seller', api.promotionsBySeller)
router.get('/promociones/sku/:sku', api.promotionsBySku)

module.exports = router
