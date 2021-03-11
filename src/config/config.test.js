'use strict'

process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const { config, show, stats } = require('./index')

describe('Config', () => {
  it('should get config object', () => {
    expect(config).to.be.an('object')
  })
  it('should get show object', () => {
    expect(show).to.be.an('object')
  })
  it('should get stats object', () => {
    expect(stats).to.be.an('object')
  })
})
