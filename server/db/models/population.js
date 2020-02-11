const mongoose = require('mongoose')
process.env.MONGODB_SERVER = `mongodb+srv://viZ:UnaZiv4JavaMineN0ir@cluster0-hqnuy.mongodb.net/delvenyc`
const connURI = process.env.MONGODB_SERVER
  ? process.env.MONGODB_SERVER
  : 'mongodb://localhost/delvenyc'
console.log('Connection URI:', connURI)

const db = mongoose.connect(connURI, {useNewUrlParser: true})

const PopulationSchema = new mongoose.Schema({
  borough: String,
  year: Number,
  fips_county_code: String,
  nta_code: String,
  nta_name: String,
  population: Number
})
const Population = mongoose.model('population', PopulationSchema)

module.exports = {Population}
