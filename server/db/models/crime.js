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

const crimeSchema = new mongoose.Schema({
  OFNS_DESC: String,
  ARREST_DATE: String,

  location: pointSchema
})

const Crime = mongoose.model('Crime', crimeSchema)

module.exports = {
  Crime
}
