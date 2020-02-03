const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/delvenyc', {useNewUrlParser: true})
const NTA = require('../NTA.json')
const Boro = require('./boro.geojson')

// Schema
// validators - https://mongoosejs.com/docs/validation.html
const polySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: true
  },
  coordinates: {
    type: [[[Number]]], // array of arrays of arrays of numbers
    required: true
  }
})

// required because coordinate type changes from [[[Number]]] to [[[[Number]]]]
const multiPolySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['MultiPolygon'],
    required: true
  },
  coordinates: {
    type: [[[[Number]]]],
    required: true
  }
})

// neighborhoods
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
  geometry: polySchema,
  properties: neighborPropSchema
})

const neighborMultiPolySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Feature'],
    required: true
  },
  id: {
    type: Number
  },
  geometry: multiPolySchema,
  properties: neighborPropSchema
})

// boroughs
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

// borough data exclusively uses MultiPolygon

const boroughMultiPolySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Feature'],
    required: true
  },
  geometry: multiPolySchema,
  properties: boroughPropSchema
})

// Schema method

// Model - a class that we use to construct documents
// neighborhoods
const NeighborPoly = mongoose.model('NeighborPoly', neighborPolySchema)
const NeighborMultiPoly = mongoose.model(
  'NeighborPoly',
  neighborMultiPolySchema
)
const BoroughMultiPoly = mongoose.model(
  'BoroughMultiPoly',
  boroughMultiPolySchema
)

// Document
// neighborhoods
// NTA.features.forEach(nta => {
//   try {
//     if (nta.geometry.type === 'Polygon') {
//       NeighborPoly.create(nta)
//                   .then(doc => console.log('NTA Polygon id:', doc.id));
//     } else if (nta.geometry.type === 'MultiPolygon') {
//       NeighborMultiPoly.create(nta)
//                   .then(doc => console.log('NTA MultiPolygon id:', doc.id));
//     } else {
//       console.log('ERROR:', nta.id, nta.geometry.type)
//     }
//   } catch (error) {
//     console.log('Error seeding neighborhoods:', error)
//   }
// })

// Boro.features.forEach(boro => {
//   try {
//     BoroughMultiPoly.create(boro)
//                     .then(doc => console.log('Boro MultiPolygon id:', doc.id))
//   } catch (error) {
//     console.log('Error seeding boroughs:', error)
//   }
// })

// We've changed our name to Delve.NYC! We've updated our MVP, contract and norms.
