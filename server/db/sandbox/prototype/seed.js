const mongoose = require('mongoose')
const {NeighborPoly, BoroughPoly, City} = require('./city')

const NTA = require('../NTA.json')
const Boro = require('./boro.json')

// Document
const seed = () => {
  //  - neighborhoods
  NTA.features.forEach(nta => {
    // load all of them
    try {
      NeighborPoly.create(nta).then(doc =>
        console.log('NTA Polygon id:', doc.id)
      )
    } catch (error) {
      console.log('Error seeding neighborhoods:', error)
    }
  })
  //  - boroughs
  Boro.features.forEach(boro => {
    // load all of them
    try {
      BoroughPoly.create(boro).then(doc =>
        console.log('Boro MultiPolygon id:', doc.id)
      )
    } catch (error) {
      console.log('Error seeding boroughs:', error)
    }
  })
  //  - city
  City.create({
    name: 'New York',
    aggregateFoodGrade: 'A',
    totalRestaurants: 40000
  }).then(doc => console.log('City:', doc.name))
}

mongoose.connect(
  'mongodb://localhost/delvenyc',
  {useNewUrlParser: true},
  () => {
    mongoose.connection.db.dropDatabase(function(err, result) {
      console.log(`Dropping database:
    error - ${err}
    result - ${result}`)
    })
    seed()
  }
)
