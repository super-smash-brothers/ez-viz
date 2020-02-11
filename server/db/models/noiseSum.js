const mongoose = require('mongoose')

const noiseSum = new mongoose.Schema({
  sumCount: {
    type: [],
    required: true
  }
})

const NoiseSum = mongoose.model('NoiseSum', noiseSum)

module.exports = {
  NoiseSum
}
