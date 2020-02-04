const mongoose = require('mongoose')
const {
  NeighborPoly,
  NeighborMultiPoly,
  BoroughMultiPoly,
  City
} = require('./city')
mongoose.connect('mongodb://localhost/delvenyc', {useNewUrlParser: true})

// https://stackoverflow.com/questions/13097266/querying-nested-documents-using-mongoose-mongodb
BoroughMultiPoly.find({'properties.boro_name': 'Queens'}).then(qns =>
  // console.log('Found:', qns)
  NeighborPoly.find({
    geometry: {
      $geoWithin: {
        $geometry: qns[0].geometry
      }
    }
  }).then(docs => console.log(docs.map(elem => elem.name)))
)
