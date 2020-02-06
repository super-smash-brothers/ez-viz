// const mongoose = require('mongoose')

// if (!process.env.MONGODB_SERVER)
//   console.log(
//     'MongoDB Atlas server not found. Defaulting to local MongoDB server.'
//   )
// else console.log('MongoDB Atlas server found. Connecting.')
// const connURI = process.env.MONGODB_SERVER
//   ? process.env.MONGODB_SERVER
//   : 'mongodb://localhost/delvenyc'
// console.log('Connection URI:', connURI)

// mongoose.connect(connURI, { useNewUrlParser: true })

// // // Schema
// const polySchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Polygon', 'MultiPolygon'],
//     required: true
//   },
//   coordinates: {
//     type: [],
//     required: true
//   }
// })

// //  - neighborhoods
// const neighborPropSchema = new mongoose.Schema({
//   OBJECTID: {
//     type: Number
//   },
//   BoroCode: {
//     type: Number
//   },
//   BoroName: {
//     type: String
//   },
//   CountyFIPS: {
//     type: String
//   },
//   NTACode: {
//     type: String
//   },
//   NTAName: {
//     type: String
//   },
//   Shape__Area: {
//     type: Number
//   },
//   Shape__Length: {
//     type: Number
//   },
//   aggregateFoodGrade: {
//     type: String
//   },
//   aggregateFoodGradePercentile: {
//     type: Number
//   },
//   totalRestaurants: {
//     type: Number
//   }
// })

// const neighborPolySchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Feature'],
//     required: true
//   },
//   id: {
//     type: Number
//   },
//   geometry: polySchema,
//   properties: neighborPropSchema
// })

// //  - boroughs
// const boroughPropSchema = new mongoose.Schema({
//   boro_code: {
//     type: Number
//   },
//   boro_name: {
//     type: String
//   },
//   shape_area: {
//     type: Number
//   },
//   shape_leng: {
//     type: Number
//   },
//   aggregateFoodGrade: {
//     type: String
//   },
//   aggregateFoodGradePercentile: {A
//     type: Number
//   },
//   totalRestaurants: {
//     type: Number
//   }
// })

// const boroughPolySchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Feature'],
//     required: true
//   },
//   geometry: polySchema,
//   properties: boroughPropSchema
// })

// //  - city
// const cityPropSchema = new mongoose.Schema({
//   name: {
//     type: String
//   },
//   aggregateFoodGrade: {
//     type: String
//   },
//   // aggregateFoodGradePercentile does not make sense until we have multiple cities
//   totalRestaurants: {
//     type: Number
//   }
// })

// // Schema method

// // Model - a class that we use to construct documents
// // const NeighborPoly = mongoose.model('NeighborPoly', neighborPolySchema)
// // const BoroughPoly = mongoose.model('BoroughPoly', boroughPolySchema)
// // const City = mongoose.model('City', cityPropSchema)

// // Document
// const seed = () => {
//   //  - neighborhoods
//   NTA.features.forEach(nta => {
//     // load all of them
//     try {
//       NeighborPoly.create(nta).then(doc =>
//         console.log('NTA Polygon id:', doc.id)
//       )
//     } catch (error) {
//       console.log('Error seeding neighborhoods:', error)
//     }
//   })
//   //  - boroughs
//   Boro.features.forEach(boro => {
//     // load all of them
//     try {
//       BoroughPoly.create(boro).then(doc =>
//         console.log('Boro MultiPolygon id:', doc.id)
//       )
//     } catch (error) {
//       console.log('Error seeding boroughs:', error)
//     }
//   })
//   //  - city
//   City.create({
//     name: 'New York',
//     aggregateFoodGrade: 'A',
//     totalRestaurants: 40000
//   }).then(doc => console.log('City:', doc.name))
// }

// mongoose.connect(
//   'mongodb://localhost/delvenyc',
//   { useNewUrlParser: true },
//   () => {
//     // mongoose.connection.db.dropDatabase(function (err, result) {
//     //   console.log(`Dropping database:
//     // error - ${err}
//     // result - ${result}`)
//     // })
//     // seed()
//   }
// )

// module.exports = {
// //   NeighborPoly,
// //   BoroughPoly,
// //   // City
// // }
