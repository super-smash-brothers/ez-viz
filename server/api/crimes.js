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
