const router = require('express').Router()
const {RestaurantPoint, db, NeighborPoly, NeighborSum} = require('../db/models')
module.exports = router

// eslint-disable-next-line complexity
router.get('/letterGrade', async (req, res, next) => {
  try {
    const neighborSum = await NeighborSum.find()
    res.json(neighborSum[0].sumScore)
  } catch (error) {
    next(error)
  }
})

router.get('/cuisine/:nta', async (req, res, next) => {
  try {
    const nta = `${req.params.nta}`
    const match = {$match: {nta}}
    const group = {$group: {_id: '$cuisine', count: {$sum: 1}}}
    const sort = {$sort: {count: -1}}
    const limit = {$limit: 5}
    await RestaurantPoint.aggregate([match, group, sort, limit]).exec(
      (err, data) => {
        if (err) return res.json(err)
        let payLoad = {
          cuisineObjects: [],
          cuisineNames: [],
          counts: []
        }
        for (let i = 0; i < data.length; i++) {
          payLoad.cuisineObjects.push(data[i])
          payLoad.cuisineNames.push(data[i]._id)
          payLoad.counts.push(data[i].count)
        }
        res.json(payLoad)
      }
    )
  } catch (error) {
    console.error(error)
  }
})

router.get('/barchart/:id', async (req, res, next) => {
  try {
    console.log('hitting')
    let id = `$${req.params.id}`
    const data = await RestaurantPoint.aggregate([
      {
        $group: {
          _id: id,
          count: {$sum: 1}
        }
      },
      {
        $sort: {count: -1}
      },
      {$limit: 5}
    ])
    res.json(data)
  } catch (error) {
    console.error(error)
  }
})
