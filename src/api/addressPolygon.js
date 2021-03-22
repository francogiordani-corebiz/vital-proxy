const { default: axios } = require('axios')
const NodeGeocoder = require('node-geocoder')
const {
  config: { keys }
} = require('../config')

const geocoder = NodeGeocoder({
  apiKey: 'AIzaSyDB6yrsncQV3qkJMu8RfoPZNN3SNSvvh7M'
})

const DELTA = 0.00085 / 2

const getPolygonAroundAddress = (req, res) => {
  const {
    params: { addressId }
  } = req

  console.log('polygon!')
  axios
    .get(
      `https://arvitalqa.myvtex.com/api/dataentities/AD/documents/${addressId}?_fields=number,street,city,postalCode`,
      {
        headers: {
          'X-VTEX-API-AppKey': keys.main.appKey,
          'X-VTEX-API-AppToken': keys.main.appToken
        }
      }
    )
    .then(async (response) => {
      const { data } = response

      if (data) {
        const address = data
        const { number, street, city, postalCode } = address

        const searchString = `${street} ${number} ${postalCode} ${city}`

        const response = await geocoder.geocode(searchString)

        if (response.length > 0) {
          // console.log(response)
          const { latitude, longitude } = response[0]
          const geoCoordinates = `${longitude},${latitude}`

          const polygon = [
            [longitude + DELTA, latitude + DELTA],
            [longitude + DELTA, latitude - DELTA],
            [longitude - DELTA, latitude + DELTA],
            [longitude - DELTA, latitude - DELTA]
          ]

          res.json({
            searchString,
            geoCoordinates: {
              lat: latitude,
              lon: longitude
            },
            polygon,
            delta: DELTA
          })
          console.log(
            `\n${searchString}: ${geoCoordinates}\t ${JSON.stringify(polygon)}`
          )
        }
      } else {
        res.end('Address not found')
      }
    })
}

module.exports = { getPolygonAroundAddress }
