const mongoose = require('mongoose')

const cityPropSchema = new mongoose.Schema({
  name: {
    type: String
  },
  aggregateFoodGrade: {
    type: String
  },
  // aggregateFoodGradePercentile does not make sense until we have multiple cities
  totalRestaurants: {
    type: Number
  }
})

const CitySchema = mongoose.model('City', cityPropSchema)

module.exports = {
  CitySchema
}
