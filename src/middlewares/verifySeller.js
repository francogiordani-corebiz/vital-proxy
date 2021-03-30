const allowedSellers = [
  /* testing sellers */
  'arvitalqa',
  'arvitalqalh',
  'arvitalqatr',

  /* production sellers */
  'arvital',
  'arvitalbu',
  'arvitalmo',
  'arvitallf',
  'arvitalma',
  'arvitallp',
  'arvitaltet',
  'arvitalav',
  'arvitalpo',
  'arvitalre',
  'arvitalne',
  'arvitalsf',
  'arvitalmp',
  'arvitalbb',
  'arvitalsa'
]

const verifySeller = (req, res, next) => {
  const {
    params: { seller }
  } = req

  if (allowedSellers.indexOf(seller) === -1) {
    res.status(400)
    res.end('Seller not found')
    return
  }

  next()
}

module.exports = verifySeller
