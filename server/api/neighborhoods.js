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

// router.get('/', async (req, res, next) => { // mongoDB
//   try {
//     const allNeighborPoly = await NeighborPoly.find()
//     const geoJSON = {
//       // returning data in a geoJSON format
//       type: 'FeatureCollection',
//       crs: {type: 'name', properties: {name: 'EPSG:4326'}},
//       features: allNeighborPoly
//     }
//     res.json(geoJSON)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/', async (req, res, next) => {
  // heroku
  try {
    const geoJSON = require('../../public/NTA.json')
    res.json(geoJSON)
  } catch (err) {
    next(err)
  }
})
