const { promotionsBySku, promotionsBySeller } = require('./promotions')
const { inventoryBySellerAndSku } = require('./inventory')
const { ping } = require('./ping')

module.exports = {
  promotionsBySeller,
  promotionsBySku,
  ping,
  inventoryBySellerAndSku
}
