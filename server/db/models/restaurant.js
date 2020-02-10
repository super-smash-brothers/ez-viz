const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number], // array of numbers
    required: true
  }
})

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String
  },
  borough: {
    type: String
  },
  cuisine: {
    type: String
  },
  inspectionDate: {
    type: String
  },
  violationCode: String, // same as {type: String}
  violationDescription: String,
  criticalFlag: String,
  score: {
    type: Number
  },
  letterGrade: {
    type: String
  },
  recordDate: {
    type: Date
  },
  location: pointSchema,
  nta: {
    type: String
  },
  pastViolation: [String] // array of strings
})

const RestaurantPoint = mongoose.model('RestaurantPoint', restaurantSchema)

module.exports = {
  RestaurantPoint
}
