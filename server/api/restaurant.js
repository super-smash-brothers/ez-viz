const router = require('express').Router()
const {RestaurantPoint} = require('../db/models/')
module.exports = router

router.get('/barchart/:id', async (req, res, next) => {
  try {
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
    data.sort()
    res.json(data)
  } catch (error) {
    console.error(error)
  }
})
