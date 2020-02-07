const mongoose = require('mongoose')

const neighborSum = new mongoose.Schema({
  sumScore: {
    type: [],
    required: true
  }
})

const NeighborSum = mongoose.model('NeighborSum', neighborSum)

module.exports = {
  NeighborSum
}
