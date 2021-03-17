const { promotionsBySku, promotionsBySeller } = require('./promotions')
const { inventoryBySellerAndSku } = require('./inventory')
const { getOrder, getOrders } = require('./getOrder')
const { handler } = require('./handler')
const { ping } = require('./ping')

module.exports = {
  promotionsBySeller,
  promotionsBySku,
  ping,
  inventoryBySellerAndSku,
  getOrder,
  getOrders,
  handler
}
