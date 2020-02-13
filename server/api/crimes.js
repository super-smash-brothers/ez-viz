const router = require('express').Router()
const {Crime, NeighborPoly, CrimeSum} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const data = await CrimeSum.find()
    res.json(data[0])
  } catch (error) {
    console.error(error)
  }
})

router.get('/topcrimes/:nta', (req, res, next) => {
  try {
    const nta = req.params.nta
    //Finding the geometry of the specific NTA and then querying for all of the points in the geometry
    NeighborPoly.find({'properties.NTACode': nta}).exec((err, ntaPoly) => {
      if (err) return res.json(err)
      Crime.find({
        location: {
          $geoWithin: {
            $geometry: ntaPoly[0].geometry
          }
        }
      }).exec((err2, allPoints) => {
        //Aggregating all of the points with the same description
        if (err2) return res.json(err2)
        let aggregateCrime = {}
        for (let i = 0; i < allPoints.length; i++) {
          const description = allPoints[i].OFNS_DESC
          if (!aggregateCrime[description]) {
            aggregateCrime[description] = 1
          } else {
            aggregateCrime[description]++
          }
        }
        const payload = Object.entries(aggregateCrime)
        payload.sort((a, b) => {
          return b[1] - a[1]
        })
        const limitPayload = []
        for (let i = 0; i < 5; i++) {
          limitPayload.push(payload.shift())
        }
        res.json(limitPayload)
      })
    })
  } catch (error) {
    next(error)
  }
})

router.get('/time/:nta', (req, res, next) => {
  try {
    const nta = req.params.nta.toUpperCase()
    //Finding the geometry of the specific NTA and then querying for all of the points in the geometry
    NeighborPoly.find({'properties.NTACode': nta}).exec((err, ntaPoly) => {
      if (err) return res.json(err)
      Crime.find({
        location: {
          $geoWithin: {
            $geometry: ntaPoly[0].geometry
          }
        }
      }).exec((err2, allPoints) => {
        //Aggregating all of the points with the same description
        if (err2) return res.json(err2)
        let timeSum = {}
        for (let i = 0; i < allPoints.length; i++) {
          let trimTime = allPoints[i].ARREST_DATE.slice(0, 10)
          if (!timeSum[trimTime]) {
            timeSum[trimTime] = 1
          } else {
            timeSum[trimTime]++
          }
        }
        res.json({
          crimeArr: Object.entries(timeSum),
          dates: Object.keys(timeSum),
          counts: Object.values(timeSum)
        })
      })
    })
  } catch (error) {
    next(error)
  }
})
