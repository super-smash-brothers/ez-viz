const router = require('express').Router()
const {Population} = require('../db/models/')

module.exports = router

router.get('/', (req, res, next) => {
  Population.find(
    {year: {$eq: 2010}},
    {nta_code: 1, population: 1, _id: 0}
  ).exec((err, data) => {
    if (err) res.json(err)
    res.json(data)
  })
})

router.get('/relative/:nta', async (req, res, next) => {
  try {
    const data = await Population.find(
      {year: {$eq: 2010}},
      {nta_code: 1, population: 1, nta_name: 1, _id: 0}
    ) // all noisesum data

    // sort all, descending
    let arrayData = []
    data.forEach(ele => {
      arrayData.push([ele.nta_code, ele.population, ele.nta_name])
    })
    arrayData = arrayData.sort((a, b) => {
      return b[1] - a[1]
    })

    const payload = {}
    const nta = req.params.nta.toUpperCase()
    payload.allNtaCount = 0
    payload.relative = []
    let foundIdx = null
    for (let i = 0; i < arrayData.length; i++) {
      payload.allNtaCount += arrayData[i][1]
      if (arrayData[i][0] === nta) {
        payload.ntaCount = arrayData[i][1]
        foundIdx = i
      }
    }
    if (foundIdx <= 2) {
      for (let i = 0; i < 5; i++) {
        const current = arrayData[i]
        payload.relative.push({
          nta: current[0],
          count: current[1],
          ntaName: current[2]
        })
      }
    } else if (foundIdx >= arrayData.length - 3) {
      for (let i = arrayData.length - 5; i < arrayData.length; i++) {
        const current = arrayData[i]
        payload.relative.push({
          nta: current[0],
          count: current[1],
          ntaName: current[2]
        })
      }
    } else {
      for (let i = foundIdx - 2; i < foundIdx + 3; i++) {
        const current = arrayData[i]
        payload.relative.push({
          nta: current[0],
          count: current[1],
          ntaName: current[2]
        })
      }
    }
    res.json(payload)
  } catch (error) {
    console.error(error)
  }
})
