const mongoose = require('mongoose')

const polySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon', 'MultiPolygon'],
    required: true
  },
  coordinates: {
    type: [],
    required: true
  }
})

const boroughPropSchema = new mongoose.Schema({
  boro_code: {
    type: Number
  },
  boro_name: {
    type: String
  },
  shape_area: {
    type: Number
  },
  shape_leng: {
    type: Number
  },
  aggregateFoodGrade: {
    type: String
  },
  aggregateFoodGradePercentile: {
    type: Number
  },
  totalRestaurants: {
    type: Number
  }
})

const boroughPolySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Feature'],
    required: true
  },
  geometry: polySchema,
  properties: boroughPropSchema
})

const BoroughPoly = mongoose.model('BoroughPoly', boroughPolySchema)

module.exports = {
  BoroughPoly
}
