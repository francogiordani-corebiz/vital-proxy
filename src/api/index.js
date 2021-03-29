const { updatePromotions, promotionsBySeller } = require('./promotions')
const { inventoryBySellerAndSku } = require('./inventory')
const { getOrder, getOrders } = require('./getOrder')
const { handler } = require('./handler')
const { ping } = require('./ping')
const { getPolygonAroundAddress } = require('./addressPolygon')

module.exports = {
  promotionsBySeller,
  updatePromotions,
  ping,
  inventoryBySellerAndSku,
  getOrder,
  getOrders,
  getPolygonAroundAddress,
  handler
}
