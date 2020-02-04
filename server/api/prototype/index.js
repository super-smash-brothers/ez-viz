const router = require('express').Router()
const {
  NeighborPoly,
  BoroughPoly,
  City
} = require('../../db/sandbox/prototype/schema')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('/api/prototype/ reached')
    BoroughMultiPoly.find().then(arr => {
      const geoJSON = {
        // returning data in a geoJSON format
        type: 'FeatureCollection',
        crs: {type: 'name', properties: {name: 'EPSG:4326'}},
        features: arr
      }
      res.json(geoJSON)
    })
  } catch (err) {
    next(err)
  }
})

router.get('/neighborhoods', async (req, res, next) => {
  try {
    console.log('/api/prototype/neighborhoods reached')
    NeighborPoly.find().then(arr => {
      res.json(arr)
      // const geoJSON = { // returning data in a geoJSON format
      //   "type": "FeatureCollection",
      //   "crs": {"type": "name", "properties": {"name": "EPSG:4326"}},
      //   "features": arr
      // }
      // res.json(geoJSON)
    })
  } catch (err) {
    next(err)
  }
})
