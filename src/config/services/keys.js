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
    appKey: process.env.ARVITAL_APPKEY,
    appToken: process.env.ARVITAL_APPTOKEN
  },
  arvitalbu: {
    appKey: process.env.ARVITALBU_APPKEY,
    appToken: process.env.ARVITALBU_APPTOKEN
  },
  arvitalmo: {
    appKey: process.env.ARVITALMO_APPKEY,
    appToken: process.env.ARVITALMO_APPTOKEN
  },
  arvitallf: {
    appKey: process.env.ARVITALLF_APPKEY,
    appToken: process.env.ARVITALLF_APPTOKEN
  },
  arvitalma: {
    appKey: process.env.ARVITALMA_APPKEY,
    appToken: process.env.ARVITALMA_APPTOKEN
  },
  arvitallp: {
    appKey: process.env.ARVITALLP_APPKEY,
    appToken: process.env.ARVITALLP_APPTOKEN
  },
  arvitaltet: {
    appKey: process.env.ARVITALTET_APPKEY,
    appToken: process.env.ARVITALTET_APPTOKEN
  },
  arvitalav: {
    appKey: process.env.ARVITALAV_APPKEY,
    appToken: process.env.ARVITALAV_APPTOKEN
  },
  arvitalpo: {
    appKey: process.env.ARVITALPO_APPKEY,
    appToken: process.env.ARVITALPO_APPTOKEN
  },
  arvitalre: {
    appKey: process.env.ARVITALRE_APPKEY,
    appToken: process.env.ARVITALRE_APPTOKEN
  },
  arvitalne: {
    appKey: process.env.ARVITALNE_APPKEY,
    appToken: process.env.ARVITALNE_APPTOKEN
  },
  arvitalsf: {
    appKey: process.env.ARVITALSF_APPKEY,
    appToken: process.env.ARVITALSF_APPTOKEN
  },
  arvitalmp: {
    appKey: process.env.ARVITALMP_APPKEY,
    appToken: process.env.ARVITALMP_APPTOKEN
  },
  arvitalbb: {
    appKey: process.env.ARVITALBB_APPKEY,
    appToken: process.env.ARVITALBB_APPTOKEN
  },
  arvitalsa: {
    appKey: process.env.ARVITALSA_APPKEY,
    appToken: process.env.ARVITALSA_APPTOKEN
  }
}

module.exports = keys
