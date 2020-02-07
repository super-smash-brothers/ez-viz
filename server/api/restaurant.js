const router = require('express').Router()
const {RestaurantPoint, db, NeighborPoly} = require('../db/models/')
module.exports = router

// router.get('/points/:view', async (req, res, next) => {
//   try {
//     console.log('hitting points route')
//     let sortDistinct = (`$${req.params.view}`)
//     const distinct = await NeighborPoly.distinct('properties.NTACode')

//     res.send('hello')
//   }
//   catch (error) {
//     next(error)
//   }
// })

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
