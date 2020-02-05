// testing to make sure Express routes return appropriate information after accessing database

/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../../index')

// remove process.env.MONGODB_SERVER from secrets.js to test local server
// and change xdescribe to describe

xdescribe('Routes returning polygons', () => {
  describe('/api/prototype/ returns a geoJSON', () => {
    it('GET /api/prototype/', async () => {
      const res = await request(app)
        .get('/api/prototype/')
        .expect(200)

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
