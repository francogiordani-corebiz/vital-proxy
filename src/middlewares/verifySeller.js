const allowedSellers = ['arvitalqalh', 'arvitalqatr']

const verifySeller = (req, res, next) => {
  const {
    params: { seller }
  } = req

  if (allowedSellers.indexOf(seller) === -1) {
    res.status(400)
    res.end('Seller not found')
  }
}

module.exports = verifySeller
