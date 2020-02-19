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

const noiseSchema = new mongoose.Schema({
  complaint_type: String,
  descriptor: String,
  location: pointSchema
})

const Noise = mongoose.model('Noise', noiseSchema)

module.exports = {
  Noise
}
