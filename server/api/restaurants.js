const router = require('express').Router()
const {RestaurantPoint, db, NeighborPoly, NeighborSum} = require('../db/models')
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

// eslint-disable-next-line complexity
router.get('/letterGrade', async (req, res, next) => {
  try {
    // const foodScore = await RestaurantPoint.aggregate([
    // { $match: { letterGrade: { $in: ['A', 'B', 'C'] } } },
    // {
    //   $group: {
    //     _id: '$nta',
    //   }
    // },
    // ])
    const neighborSum = await NeighborSum.find()
    res.json(neighborSum[0].sumScore)
    // let letterGradesByNTA = await uniqueNTA.map(async ntaName => {
    //   let ntaAgg
    //   let numScores = 0;
    //   await RestaurantPoint.find({ nta: ntaName })
    //   , (err, allNtaPoints) => {
    //     if (err) console.log(err)
    //     console.log(allNtaPoints)
    //     for (let i = 0; i < allNtaPoints; i++) {
    //       let curNtaPoint = allNtaPoints[i]
    //       if (curNtaPoint.letterGrade !== null) {
    //         ntaAgg += curNtaPoint.letterGrade
    //         numScores++
    //       }
    //     }
    //   })
    //   return [ntaName, ntaAgg / numScores]
    // })
    // res.json(letterGradesByNTA)
  } catch (error) {
    next(error)
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
