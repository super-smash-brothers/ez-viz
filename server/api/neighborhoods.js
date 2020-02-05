const router = require('express').Router()
const {NeighborPoly, BoroughPoly} = require('../db/models/')
module.exports = router

router.get('/boro', async (req, res, next) => {
  try {
    await BoroughPoly.find().then(arr => {
      const geoJSON = {
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

router.get('/', (req, res, next) => {
  try {
    console.log(NeighborPoly)
    NeighborPoly.find().then(arr => {
      res.json(arr)
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
