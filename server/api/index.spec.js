// testing to make sure Express routes return appropriate information after accessing database

/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')

describe('Routes returning polygons', () => {
  describe('/api/neighborhoods/ returns a geoJSON', () => {
    it('GET /api/neighborhoods/', done => {
      const res = request(app)
        .get('/api/neighborhoods/')
        .expect(200, done())

      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('type')
      expect(res.body).to.have.property('crs')
      expect(res.body).to.have.property('features')
      expect(res.body.features[0]).to.have.property('type')
      expect(res.body.features[0]).to.have.property('_id')
      expect(res.body.features[0]).to.have.property('geometry')
      expect(res.body.features[0].geometry).to.have.property('type')
      expect(res.body.features[0].geometry).to.have.property('coordinates')
      expect(res.body.features[0]).to.have.property('properties')
    })
  })
})
