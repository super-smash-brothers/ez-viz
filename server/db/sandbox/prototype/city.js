const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/delvenyc', {useNewUrlParser: true})
const NTA = require('../NTA.json')
const Boro = require('./boro.geojson')

// Schema
// validators - https://mongoosejs.com/docs/validation.html
const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: true
  },
  coordinates: {
    type: [[[Number]]], // Array of arrays of arrays of numbers
    required: true
  }
})

const neighborPropSchema = new mongoose.Schema({
  OBJECTID: {
    type: Number
  },
  BoroCode: {
    type: Number
  },
  BoroName: {
    type: String
  },
  CountyFIPS: {
    type: String
  },
  NTACode: {
    type: String
  },
  NTAName: {
    type: String
  },
  Shape__Area: {
    type: Number
  },
  Shape__Length: {
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

const neighborPolySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Feature'],
    required: true
  },
  id: {
    type: Number
  },
  geometry: polygonSchema,
  properties: neighborPropSchema
})

// Schema method

// Model - a class that we use to construct documents
const NeighborPoly = mongoose.model('NeighborPoly', neighborPolySchema)

// Document
// NTA.features.forEach(nta => {
//   NeighborPoly.create(nta)
//               .then(doc => console.log('NTA id:', doc.id));
// })
