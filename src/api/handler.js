const {
  show,
  config: { keys }
} = require('../config')
const axios = require('axios').default

const handler = async (req, res) => {
  const data = req.body || req.data || null
  const {
    query,
    params: { seller }
  } = req

  const internalUrlPartial = `/seller/${seller}`
  const vtexApiUrl = req.url.replace(internalUrlPartial, '')

  const params = {
    method: req.method,
    url: `https://${seller}.vtexcommercestable.com.br` + vtexApiUrl,
    headers: {
      Accept: 'application/vnd.vtex.ds.v10+json',
      'Content-Type': 'application/json',
      'x-vtex-api-appKey': keys[seller].appKey,
      'X-VTEX-API-AppToken': keys[seller].appToken,
      'Access-Control-Expose-Headers': '*',
      'access-control-allow-headers': '*'
    },
    query,
    data
  }
  axios(params)
    .then(function (response) {
      show.info(`${req.method} ${vtexApiUrl} (${response.status})`)
      res.set(response.headers)
      res.json(response.data)
    })
    .catch(function (error) {
      if (error.response) {
        show.error(`${req.method} ${vtexApiUrl} (${error.response.status})`)
        if (data) {
          show.error(`Data ${JSON.stringify(data)}`)
        }
        show.error(JSON.stringify(error.response.data))
        res.status(error.response.status)
        res.json(error.response.data)
      } else {
        show.error(`Request failed - ${error.reason} `)
        res.status(500)
        res.json({ Message: error.reason })
      }
    })
}

module.exports = { handler }
