'use strict'

const path = require('path')
let basePath = path.join(__dirname, '../../../')
const env = process.env.NODE_ENV
if (env === 'production') {
  basePath = './'
}
const envPath = path.join(basePath, '.env/vtex.keys.env')
const envConfig = require('dotenv').config({
  path: envPath
})
if (envConfig.error) {
  throw envConfig.error
}

const keys = {
  arvitalqa: {
    appKey: process.env.ARVITALQA_APPKEY,
    appToken: process.env.ARVITALQA_APPTOKEN
  },
  arvitalqalh: {
    appKey: process.env.ARVITALQALH_APPKEY,
    appToken: process.env.ARVITALQALH_APPTOKEN
  },
  arvitalqatr: {
    appKey: process.env.ARVITALQATR_APPKEY,
    appToken: process.env.ARVITALQATR_APPTOKEN
  },

  arvital: {
    appKey: process.env.RVITAL_APPKEY,
    appToken: process.env.RVITAL_APPTOKEN
  },
  arvitalbu: {
    appKey: process.env.RVITALBU_APPKEY,
    appToken: process.env.RVITALBU_APPTOKEN
  },
  arvitalmo: {
    appKey: process.env.RVITALMO_APPKEY,
    appToken: process.env.RVITALMO_APPTOKEN
  },
  arvitallf: {
    appKey: process.env.RVITALLF_APPKEY,
    appToken: process.env.RVITALLF_APPTOKEN
  },
  arvitalma: {
    appKey: process.env.RVITALMA_APPKEY,
    appToken: process.env.RVITALMA_APPTOKEN
  },
  arvitallp: {
    appKey: process.env.RVITALLP_APPKEY,
    appToken: process.env.RVITALLP_APPTOKEN
  },
  arvitaltet: {
    appKey: process.env.RVITALTET_APPKEY,
    appToken: process.env.RVITALTET_APPTOKEN
  },
  arvitalav: {
    appKey: process.env.RVITALAV_APPKEY,
    appToken: process.env.RVITALAV_APPTOKEN
  },
  arvitalpo: {
    appKey: process.env.RVITALPO_APPKEY,
    appToken: process.env.RVITALPO_APPTOKEN
  },
  arvitalre: {
    appKey: process.env.RVITALRE_APPKEY,
    appToken: process.env.RVITALRE_APPTOKEN
  },
  arvitalne: {
    appKey: process.env.RVITALNE_APPKEY,
    appToken: process.env.RVITALNE_APPTOKEN
  },
  arvitalsf: {
    appKey: process.env.RVITALSF_APPKEY,
    appToken: process.env.RVITALSF_APPTOKEN
  },
  arvitalmp: {
    appKey: process.env.RVITALMP_APPKEY,
    appToken: process.env.RVITALMP_APPTOKEN
  },
  arvitalbb: {
    appKey: process.env.RVITALBB_APPKEY,
    appToken: process.env.RVITALBB_APPTOKEN
  },
  arvitalsa: {
    appKey: process.env.RVITALSA_APPKEY,
    appToken: process.env.RVITALSA_APPTOKEN
  }
}

module.exports = keys
