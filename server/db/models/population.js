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
