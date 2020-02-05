const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/geotest', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
const NTASlice = require('./ntaSlice') // importing json does not require module.exports

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

const cityPointSchema = new mongoose.Schema({
  name: String,
  location: {
    type: pointSchema,
    required: true
  }
})

const cityPolySchema = new mongoose.Schema({
  name: String,
  location: polygonSchema
})

// Schema method
// kittySchema.methods.speak = function () {
//   const greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name"
//   console.log(greeting)
// }

// Model - a class that we use to construct documents
const CityPoint = mongoose.model(
  'CityPoint',
  new mongoose.Schema({
    name: String,
    location: pointSchema
  })
) // second argument can be replaced entirely with cityPointSchema

const CityPoly = mongoose.model('CityPoly', cityPolySchema)

// Document
const denver = {
  type: 'Point',
  coordinates: [-104.9903, 39.7392]
}

const colorado = {
  type: 'Polygon',
  coordinates: [[[-109, 41], [-102, 41], [-102, 37], [-109, 37], [-109, 41]]]
}

// const denverResult = CityPoint.create({ name: 'Denver', location: denver }).
//   then(() => CityPoint.findOne({
//     location: {
//       $geoWithin: {
//         $geometry: colorado
//       }
//     }
//   })).
//   then(doc => console.log('Denver document:', doc.name));

// const coloradoResult = CityPoly.create({ name: 'Colorado', location: colorado }).
//   then(doc => console.log('Colorado document:', doc.name));

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function() {
//   console.log("We're connected!")
// })
// code placed here is unreachable
