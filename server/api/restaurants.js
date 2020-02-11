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
    //Aggreagate pipeline each argument in aggregate
    //Takes in a specific argument that will help filter down the information
    // We first match by NTA then send over the array
    // to the next filter and will use the information provided by the array to further reduce the information down
    const nta = `${req.params.nta}`
    const match = {$match: {nta}}
    const group = {
      $group: {
        _id: {
          name: '$name',
          location: '$location.coordinates',
          cuisine: '$cuisine'
        },
        restaurant: {$push: {name: '$name', location: '$location.coordinates'}}
      }
    }
    const group2 = {
      $group: {
        _id: '$_id.cuisine',
        count: {$sum: 1},
        restaurant: {
          $push: {name: '$restaurant.name', location: '$restaurant.location'}
        }
      }
    }
    const sort = {$sort: {count: -1}}
    const limit = {$limit: 5}
    await RestaurantPoint.aggregate([match, group, group2, sort, limit]).exec(
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
