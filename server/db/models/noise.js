const mongoose = require('mongoose')

// const humanAddressSchema = new mongoose.Schema({
//   address: String,
//   city: String,
//   state: String,
//   zip: String
// })

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
  // location:
  // {
  //   latitude: String,
  //   longitude: String
  // },
  // human_address: humanAddressSchema
})

const noiseSchema = new mongoose.Schema({
  // unique_key: String,
  // created_date: String,
  // closed_date: String,
  // agency: String,
  // agency_name: String,
  complaint_type: String,
  descriptor: String,
  // location_type: String,
  // incident_zip: String,
  // incident_address: String,
  // street_name: String,
  // cross_street_1: String,
  // cross_street_2: String,
  // intersection_street_1: String,
  // intersection_street_2: String,
  // city: String,
  // landmark: String,
  // status: String,
  // resolution_description: String,
  // resolution_action_updated_date: String,
  // community_board: String,
  // bbl: String,
  // borough: String,
  // x_coordinate_state_plane: String,
  // y_coordinate_state_plane: String,
  // open_data_channel_type: String,
  // park_facility_name: String,
  // park_borough: String,
  // latitude: String,
  // longitude: String,
  location: pointSchema
})

const Noise = mongoose.model('Noise', noiseSchema)

module.exports = {
  Noise
}
