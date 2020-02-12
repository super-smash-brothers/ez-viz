const mongoose = require('mongoose')

const crimeSum = new mongoose.Schema({
  sumCount: {
    type: [],
    required: true
  }
})

const CrimeSum = mongoose.model('CrimeSum', crimeSum)

module.exports = {
  CrimeSum
}
