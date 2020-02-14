const router = require('express').Router()
const {NeighborPoly, BoroughPoly, RestaurantPoint} = require('../db/models/')
const axios = require('axios')
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

router.get('/foodscore', async (req, res, next) => {
  try {
    const aggregateData = await RestaurantPoint.aggregate([
      {
        // '$' denotes an operation for mongoose
        $group: {
          // for each group
          _id: '$nta', // where the id matches the nta
          total: {
            $sum: {
              // sum up for a total
              $toInt: '$score' // convert string to integer
            }
          },
          count: {$sum: 1}
        }
      }
    ])
    res.json(aggregateData)
  } catch (error) {
    console.error(error)
  }
})

router.get('/', async (req, res, next) => {
  // mongoDB
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

router.get('/', async (req, res, next) => {
  // heroku
  try {
    switch (process.env.NTA_SOURCE) {
      case 'mongoDB': {
        const allNeighborPoly = await NeighborPoly.find()
        const geoJSON = {
          // returning data in a geoJSON format
          type: 'FeatureCollection',
          crs: {type: 'name', properties: {name: 'EPSG:4326'}},
          features: allNeighborPoly
        }
        res.json(geoJSON)
        break
      }
      case 'github': {
        const geoJSON = await axios.get(
          'https://github.com/super-smash-brothers/delve-nyc/blob/master/server/db/sandbox/NTA.json?raw=true'
        )
        res.json(geoJSON)
        break
      }
      case 'heroku': {
        const geoJSON = require('./NTA.json')
        res.json(geoJSON)
        break
      }
      case 'nyc.gov': {
        const geoJSON = await axios.get(
          'http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nynta/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson'
        )
        res.json(geoJSON)
        break
      }
      case 'custom': {
        const geoJSON = process.env.NTA_URL
          ? await axios.get(process.env.NTA_URL)
          : undefined
        res.json(geoJSON)
        break
      }
      default: {
        // same as heroku
        const geoJSON = require('./NTA.json')
        res.json(geoJSON)
        break
      }
    }
  } catch (err) {
    next(err)
  }
})
