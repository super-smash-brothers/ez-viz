const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/restaurants', require('./restaurants'))
router.use('/neighborhoods', require('./neighborhoods'))
router.use('/noises', require('./noises'))
router.use('/crimes', require('./crimes'))
router.use('/populations', require('./populations'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
