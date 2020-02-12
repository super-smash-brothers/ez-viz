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
