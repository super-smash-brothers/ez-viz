const router = require('express').Router()
const {Noise, NeighborPoly, NoiseSum} = require('../db/models')
module.exports = router

// retrieve top 5 noise complaint descriptions for an NTA
router.get('/topnoises/:nta', (req, res, next) => {
  try {
    const nta = req.params.nta
    //Finding the geometry of the specific NTA and then querying for all of the points in the geometry
    NeighborPoly.find({'properties.NTACode': nta}).exec((err, ntaPoly) => {
      if (err) return res.json(err)
      Noise.find({
        location: {
          $geoWithin: {
            $geometry: ntaPoly[0].geometry
          }
        }
      }).exec((err2, allPoints) => {
        //Aggregating all of the points with the same description
        if (err2) return res.json(err2)
        let aggregateNoise = {}
        for (let i = 0; i < allPoints.length; i++) {
          const description = allPoints[i].descriptor
          if (!aggregateNoise[description]) {
            aggregateNoise[description] = 1
          } else {
            aggregateNoise[description]++
          }
        }
        const payload = Object.entries(aggregateNoise)
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
    console.error(error)
  }
})

//specific route not ready
// eslint-disable-next-line complexity
router.get('/relative/:nta', async (req, res, next) => {
  try {
    const data = await NoiseSum.find() // all noisesum data

    // sort all, descending
    const sortedData = data[0].sumCount.sort((a, b) => {
      return b[1] - a[1]
    })

    const payload = {}
    const nta = req.params.nta.toUpperCase()
    payload.nta = nta
    payload.allNtaCount = 0
    payload.relative = []
    let foundIdx = null
    for (let i = 0; i < sortedData.length; i++) {
      payload.allNtaCount += sortedData[i][1]
      if (sortedData[i][0] === nta) {
        payload.ntaCount = sortedData[i][1]
        foundIdx = i
      }
    }
    if (foundIdx <= 2) {
      for (let i = 0; i < 5; i++) {
        const current = sortedData[i]
        payload.relative.push({nta: current[0], count: current[1]})
      }
    } else if (foundIdx >= sortedData.length - 3) {
      for (let i = sortedData.length - 5; i < sortedData.length; i++) {
        const current = sortedData[i]
        payload.relative.push({nta: current[0], count: current[1]})
      }
    } else {
      for (let i = foundIdx - 2; i < foundIdx + 3; i++) {
        const current = sortedData[i]
        payload.relative.push({nta: current[0], count: current[1]})
      }
    }
    res.json(payload)
  } catch (error) {
    console.error(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const data = await NoiseSum.find()
    res.json(data[0])
  } catch (error) {
    console.error(error)
  }
})
