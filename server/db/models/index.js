const {CitySchema} = require('./city')
const {NeighborPoly, neighborPropSchema} = require('./neighborhood')
const {NeighborSum} = require('./neighborhoodSum')
const {RestaurantPoint} = require('./restaurant')
const {BoroughPoly} = require('./boro')
const {Noise} = require('./noise')
const {NoiseSum} = require('./noiseSum')
const mongoose = require('mongoose')
// mongoose.set('debug', true)

if (!process.env.MONGODB_SERVER)
  console.log(
    'MongoDB Atlas server not found. Defaulting to local MongoDB server.'
  )
else console.log('MongoDB Atlas server found. Connecting.')
const connURI = process.env.MONGODB_SERVER
  ? process.env.MONGODB_SERVER
  : 'mongodb://localhost/delvenyc'
console.log('Connection URI:', connURI)

const db = mongoose.connect(connURI, {useNewUrlParser: true})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

const User = require('./user') // just to maintain User in case we want to use sessions

module.exports = {
  CitySchema,
  NeighborPoly,
  RestaurantPoint,
  BoroughPoly,
  NeighborSum,
  neighborPropSchema,
  Noise,
  NoiseSum,
  db,
  User // just to maintain User in case we want to use sessions
}
