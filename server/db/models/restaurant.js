const mongoose = require('mongoose')
const {NeighborPoly, neighborPropSchema} = require('./')
mongoose.set('debug', true)

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number], // array of numbers
    required: true
  }
})

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String
  },
  borough: {
    type: String
  },
  cuisine: {
    type: String
  },
  inspectionDate: {
    type: String
  },
  violationCode: String, // same as {type: String}
  violationDescription: String,
  criticalFlag: String,
  score: {
    type: String
  },
  recordDate: {
    type: Date
  },
  location: pointSchema,
  nta: {
    type: String
  },
  pastViolation: [String] // array of strings
})

const RestaurantPoint = mongoose.model('RestaurantPoint', restaurantSchema)

//Caches aggregateFoodGrade running seed
let aggregateFoodGrade = async () => {
  try {
    const aggregateData = await RestaurantPoint.aggregate([
      {
        // '$' denotes an operation for mongoose
        $group: {
          // for each group
          _id: '$nta', // where the id matches the nta
          total: {
            $sum: {
              // sum up for a total
              $toInt: '$score' // convert string to integer
            }
          },
          count: {$sum: 1}
        }
      }
    ])
    aggregateData.forEach(async data => {
      if (data._id !== null) {
        // make sure there is a specified nta in _id
        console.log(data)
        const filter = {'properties.NTACode': data._id}
        const update = {
          $set: {'properties.aggregateFoodGrade': data.total / data.count}
        }

        const doc = await NeighborPoly.findOneAndUpdate(filter, update, {
          upser: true
        }).exec()
        console.log(doc)
      }
    })
    console.log('completed')
  } catch (error) {
    console.error(error)
  }
}

// .then(aggregateData => {
//   // aggregateData is an array
//   aggregateData.forEach(data => {
//     if (data._id !== null) {
//       // make sure there is a specified nta in _id
//       console.log(data)
//       NeighborPoly.update(
//         // append data to neighborhood
//         { 'properties.NTACode': data._id }, // specify the documents to update
//         { $set: { 'properties.aggregateFoodGrade': (data.total / data.count) } }, // set specific field of document
//         { upsert: true }, //adds fiel
//         (err) => {
//           // update is not saved without the presence of this callback
//           console.log(err)
//         }
//       )
//     }
//   })
// })

// RestaurantPoint.barChart('$cuisine')

module.exports = {
  RestaurantPoint
}
