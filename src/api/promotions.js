/* eslint-disable no-prototype-builtins */
const {
  config: { keys },
  show
} = require('../config')
const { default: axios } = require('axios')
const parseCsv = require('csv-parse')
const { client: redis } = require('../redis')

const promotionsBySeller = (req, res, next) => {
  const {
    params: { seller }
  } = req

  axios
    .get(
      `https://${seller}.myvtex.com/api/rnb/pvt/benefits/calculatorconfiguration`,
      {
        headers: {
          'X-VTEX-API-AppKey': keys[seller].appKey,
          'X-VTEX-API-AppToken': keys[seller].appToken
        }
      }
    )
    .then(({ data }) => {
      const promosBySku = {}

      data.items.forEach((promo) => {
        const skus = promo.generalValues?.Skus
        if (skus) {
          skus.split(',').forEach((sku) => {
            // add promotion to array by sku, if the sku doesnt exist yet, add that as a property
            const promoValue = {
              idCalculatorConfiguration: promo.idCalculatorConfiguration,
              isActive: promo.isActive,
              description: promo.description,
              type: promo.type,
              status: promo.status,
              generalValues: {
                Cucarda: promo.generalValues.Cucarda,
                CdPromo: promo.generalValues.CdPromo
              }
            }
            if (!promosBySku.hasOwnProperty(sku) && promo.isActive) {
              promosBySku[sku] = []
            }
            if (promo.isActive) {
              promosBySku[sku].push(promoValue)
            }
          })
        }
      })

      // Get stored promotions of type 'ofertas' (stored as .csv files in Masterdata)
      redis.get(seller, (err, result) => {
        if (err) {
          show.error(err)
        }

        if (result === null) {
          return res.json(promosBySku)
        }

        console.log('redis', result)
        const ofertas = JSON.parse(result)
        console.log('json', ofertas)
        ofertas.forEach((oferta) => {
          const { skus } = oferta
          if (skus) {
            String(skus)
              .split(',')
              .forEach((sku) => {
                const promoValue = {
                  idCalculatorConfiguration: oferta.IdOferta,
                  isActive: oferta.isActive,
                  description: oferta.Descripcion,
                  type: 'nominal',
                  status: oferta.isActive ? 'active' : '',
                  generalValues: oferta.generalValues
                }

                if (!promosBySku.hasOwnProperty(sku) && promoValue.isActive) {
                  promosBySku[sku] = []
                }
                if (promoValue.isActive) {
                  promosBySku[sku].push(promoValue)
                  console.log('pushed 1 object')
                }
              })
          }
        })

        return res.json(promosBySku)
      })
    })
    .catch((err) => {
      console.log(err)
      if (err.response) {
        res.status = err.response.status
        res.end(err.response.statusText)
        return
      }

      res.status(500)
      res.end('Internal server error')
    })
}

const updatePromotions = async (req, res, next) => {
  const { body } = req
  console.log(JSON.stringify(body))

  const { accountName, id, file, dataEntityId } = body

  if (!file) {
    res.status = 400
    return res.end('Bad Request. File is empty')
  }

  const fileList = file.split(',')
  if (fileList.length > 1) {
    res.status = 400
    return res.end('Bad Request. Multiple files in field')
  }

  const fileUrl = `https://${accountName}.vtexcommercestable.com.br/api/dataentities/${dataEntityId}/documents/${id}/file/attachments/${file}`

  const { data: fileContent, status } = await axios.get(fileUrl)

  if (status !== 200) {
    res.status = 500
    return res.end(`Error retrieving file from Vtex MasterData.\n
    URL: ${fileUrl}`)
  }

  parseCsv(
    fileContent,
    {
      columns: true,
      trim: true,
      cast: true,
      castDate: true
    },
    (err, output) => {
      if (err) {
        res.status = 500
        return res.end(`Error parsing CSV file.\t${err}`)
      }
      const now = new Date()

      // Transform output to expected promotion object
      const promos = []

      output.forEach((promo) => {
        const { Skus } = promo

        const isActive = now < promo.Expiracion
        const promoValue = {
          skus: String(Skus),
          idCalculatorConfiguration: promo.IdOferta,
          isActive: isActive,
          description: promo.Descripcion,
          type: 'nominal',
          status: isActive ? 'active' : '',
          generalValues: {
            Cucarda: 'Oferta',
            PrecioLista: promo.PrecioLista,
            PrecioOferta: promo.PrecioOferta,
            CantidadMinima: promo.CantidadMinima,
            Expiracion: promo.Expiracion
          }
        }
        promos.push(promoValue)
      })

      redis.set(id, JSON.stringify(promos))

      res.status = 200
      return res.json(promos)
    }
  )
}

module.exports = { promotionsBySeller, updatePromotions }
