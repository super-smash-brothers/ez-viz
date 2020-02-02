const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ntatest', {useNewUrlParser: true})
const NTASlice = require('./ntaSlice') // importing json does not require module.exports
const NTASlice2 = require('./ntaSlice2')
const boroParkPoint = {
  name: 'Random Point 1',
  location: {
    type: 'Point',
    coordinates: [-74, 40.635]
  }
}
const boroParkPoint2 = {
  name: 'Random Point 1.1',
  location: {
    type: 'Point',
    coordinates: [-73.999, 40.635]
  }
}
const murrayHillPoint = {
  name: 'Random Point 2',
  location: {
    type: 'Point',
    coordinates: [-73.8, 40.76]
  }
}
const murrayHillPoint2 = {
  name: 'Random Point 2.1',
  location: {
    type: 'Point',
    coordinates: [-73.81, 40.76]
  }
}

// Schema
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

const neighborPointSchema = new mongoose.Schema({
  name: String,
  location: {
    type: pointSchema,
    required: true
  }
})

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
  }
})

const neighborPolySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Feature'],
    required: true
  },
  id: {
    type: Number,
    // unique check here
    required: true
  },
  geometry: polygonSchema,
  properties: neighborPropSchema
})

// Schema method

// Model - a class that we use to construct documents
const NeighborPoly = mongoose.model('NeighborPoly', neighborPolySchema)
const NeighborPoint = mongoose.model('NeighborPoint', neighborPointSchema)

// Document
// const NTASliceResult = NeighborPoly.create(NTASlice).
//   then(doc => console.log('NTASlice document:', doc.properties.NTAName));
// const NTASlice2Result = NeighborPoly.create(NTASlice2).
//   then(doc => console.log('NTASlice2 document:', doc.properties.NTAName));
// const boroParkPointResult = NeighborPoint.create(boroParkPoint).
//   then(doc => console.log('boroParkPoint document:', doc.name));
// const murrayHillPointResult = NeighborPoint.create(murrayHillPoint).
//   then(doc => console.log('murrayHillPoint document:', doc.name));
// const boroParkPoint2Result = NeighborPoint.create(boroParkPoint2).
//   then(doc => console.log('boroParkPoint2 document:', doc.name));
// const murrayHillPoint2Result = NeighborPoint.create(murrayHillPoint2).
//   then(doc => console.log('murrayHillPoint2 document:', doc.name));

NeighborPoint.find({
  location: {
    $geoWithin: {
      $geometry: NTASlice.geometry
    }
  }
}).then(docs => console.log(docs.map(elem => elem.name)))

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function() {
//   console.log("We're connected!")
// })
// code placed here is unreachable
