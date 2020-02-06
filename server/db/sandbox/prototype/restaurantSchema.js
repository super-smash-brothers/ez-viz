// const mongoose = require('mongoose')
// const NTASlice2 = require('../ntaSlice2')
// const { NeighborPoly, BoroughPoly, City } = require('./city')
// mongoose.connect('mongodb://localhost/delvenyc', { useNewUrlParser: true })
// // const dataSet = require('../restaurant-points/restaurant1.json')
// // const dataSet1 = require('../restaurant-points/restaurant2.json')
// // const dataSet2 = require('../restaurant-points/restaurant3.json')
// // const dataSet3 = require('../restaurant-points/restaurant4.json')
// // const dataSet4 = require('../restaurant-points/restaurant5.json')
// // const dataSet5 = require('./restaurant6.json')
// // const dataSet6 = require('./restaurant7.json')
// // const dataSet7 = require('./restaurant8.json')
// // const dataSet8 = require('./restaurant9.json')
// // const dataSet9 = require('./restaurant10.json')
// // const dataSet10 = require('./restaurant11.json')
// // const dataSet11 = require('./restaurant12.json')
// // const dataSet12 = require('./restaurant13.json')
// // const dataSet13 = require('./restaurant14.json')
// // const dataSet14 = require('./restaurant15.json')
// // const dataSet15 = require('./restaurant16.json')
// // const dataSet16 = require('./restaurant17.json')

// const pointSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true
//   },
//   coordinates: {
//     type: [Number],
//     required: true
//   }
// })

// const restaurantSchema = new mongoose.Schema({
//   name: {
//     type: String
//   },
//   borough: {
//     type: String
//   },
//   cuisine: {
//     type: String
//   },
//   inspectionDate: {
//     type: String
//   },
//   violationCode: String,
//   violationDescription: String,
//   criticalFlag: String,
//   score: {
//     type: String
//   },
//   recordDate: {
//     type: Date
//   },
//   location: pointSchema,
//   nta: {
//     type: String
//   },
//   pastViolation: [String]
// })
// //creates collection
// const restaurantPoint = mongoose.model('restaurantPoint', restaurantSchema)

// restaurantSchema.aggregateFoodGrade = () => {
//   restaurantPoint
//     .aggregate([
//       {
//         $group: {
//           _id: '$nta',
//           total: {
//             $sum: {
//               $toInt: '$score'
//             }
//           },
//           count: { $sum: 1 }
//         }
//       }
//     ])
//     .then(aggregateData => {
//       aggregateData.forEach(data => {
//         if (data._id !== null) {
//           NeighborPoly.update(
//             { 'properties.NTACode': data._id },
//             { $set: { 'properties.aggregateFoodGrade': data.total / data.count } },
//             () => {
//               console.log(
//                 'needs this annonymous callback because save middle ware is not triggered when just doing an update'
//               )
//             }
//           )
//         }
//       })
//     })
// }

// // restaurantPoint.barChart = id => {
// //   restaurantPoint.aggregate([
// //     {
// //       $group: {
// //         _id: { id },
// //         count: { $sum: 1 }
// //       },
// //       count: { $sum: 1 }
// //     }
// //   ])
// //     .then(obj => {
// //       return (obj)
// //     })
// // }

// //used to insert many documents
// //Part of the seed
// // restaurantSchema.insertMany(dataSet, err => {
// //   if (err) console.error(err)
// // })

// // Seeds Restauraunt Data
// // const seedRestaurantData = () => {
// //   let i = 0
// //   dataSet.forEach(async element => {
// //     await restaurantPoint.create(element)
// //     console.log(i++)
// //   })
// //   dataSet1.forEach(async element => {
// //     await restaurantPoint.create(element)
// //     console.log(i++)
// //   })
// //   dataSet2.forEach(async element => {
// //     await restaurantPoint.create(element)
// //     console.log(i++)
// //   })
// //   dataSet3.forEach(async element => {
// //     await restaurantPoint.create(element)
// //     console.log(i++)
// //   })
// //   dataSet4.forEach(async element => {
// //     await restaurantPoint.create(element)
// //     console.log(i++)
// //   })
// // }
// //Loaded up to here
// // dataSet5.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet6.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet7.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet8.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet8.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet9.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet10.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet11.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet12.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet13.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet14.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet15.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // dataSet16.forEach(async element => {
// //   await restaurantPoint.create(element)
// //   console.log(i++)
// // });
// // }

// // seedRestaurantData()
