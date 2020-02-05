const router = require('express').Router()
const {restaurantPoint} = require('../db/models/')
module.exports = router

router.get('/barchart/:id', async (req, res, next) => {
  try {
    let id = `$${req.params.id}`
    const data = await restaurantPoint.aggregate([
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
