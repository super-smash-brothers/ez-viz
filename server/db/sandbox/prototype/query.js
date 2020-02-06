const mongoose = require('mongoose')
// const {NeighborPoly, BoroughPoly, City} = require('./city')
mongoose.connect('mongodb://localhost/delvenyc', {useNewUrlParser: true})

// https://stackoverflow.com/questions/13097266/querying-nested-documents-using-mongoose-mongodb
// BoroughMultiPoly.find({'properties.boro_name': 'Queens'}).then(qns => {
//     console.log('Found:', qns[0].geometry) // index 0 because my local database has multiplecopies of each boro
//     NeighborPoly.find({ // find all neighborhood polygons that reside inside the queens multipolygon
//       geometry: {
//         $geoWithin: {
//           $geometry: qns[0].geometry
//         }
//       }
//     }).then(docs => console.log(docs.map(elem => elem.properties.NTAName)))
//   }
// )

// BoroughMultiPoly.find().then(arr => {
//   const geoJSON = { // returning data in a geoJSON format
//     "type": "FeatureCollection",
//     "crs": {"type": "name", "properties": {"name": "EPSG:4326"}},
//     "features": arr
//   }
//   console.log(geoJSON)
// })
