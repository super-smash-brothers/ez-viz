const router = require('express').Router()
const {Noise, NeighborPoly, NoiseSum} = require('../db/models')
module.exports = router

router.get('/topnoises/:nta', (req, res, next) => {
  try {
    const nta = req.params.nta
    NeighborPoly.find({'properties.NTACode': nta}).exec((err, ntaPoly) => {
      if (err) return res.json(err)
      Noise.find({
        location: {
          $geoWithin: {
            $geometry: ntaPoly[0].geometry
          }
        }
      }).exec((err2, allPoints) => {
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
router.get('/relative/:nta', async (req, res, next) => {
  try {
    const data = await NoiseSum.find()
    const sortedData = data[0].sumCount.sort((a, b) => {
      return b[1] - a[1]
    })
    const payload = {}
    const nta = req.params.nta.toUpperCase()
    payload.nta = nta
    payload.count = 0
    payload.relative = []
    for (let i = 0; i < sortedData.length; i++) {
      payload.count += sortedData[i][1]
      payload.relative = []
      if (sortedData[i][0] === nta) {
        payload.ntaComplaints = sortedData[i][1]
        //   for (let i = 0; i < 5; i++) {
        //     if (payload.relative.length > 5)  break

        //     }
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
