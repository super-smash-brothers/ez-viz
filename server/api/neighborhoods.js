const router = require('express').Router()
const {NeighborPoly, BoroughPoly} = require('../db/models/')

module.exports = router
router.get('/boro', async (req, res, next) => {
  try {
    const allBoroughPoly = await BoroughPoly.find()
    const geoJSON = {
      type: 'FeatureCollection',
      crs: {type: 'name', properties: {name: 'EPSG:4326'}},
      features: allBoroughPoly
    }
    res.json(geoJSON)
  } catch (err) {
    next(err)
  }
})
router.get('/', async (req, res, next) => {
  try {
    const allNeighborPoly = await NeighborPoly.find()
    const geoJSON = {
      // returning data in a geoJSON format
      type: 'FeatureCollection',
      crs: {type: 'name', properties: {name: 'EPSG:4326'}},
      features: allNeighborPoly
    }
    res.json(geoJSON)
  } catch (err) {
    next(err)
  }
})
