const mongoose = require('mongoose')
const {NeighborPoly} = require('./')

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
restaurantSchema.aggregateFoodGrade = () => {
  RestaurantPoint.aggregate([
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
  ]).then(aggregateData => {
    // aggregateData is an array
    aggregateData.forEach(data => {
      if (data._id !== null) {
        // make sure there is a specified nta in _id
        NeighborPoly.update(
          // append data to neighborhood
          {'properties.NTACode': data._id}, // specify the documents to update
          {$set: {'properties.aggregateFoodGrade': data.total / data.count}}, // set specific field of document
          () => {
            // update is not saved without the presence of this callback
            console.log(
              'needs this annonymous callback because save middle ware is not triggered when just doing an update'
            )
          }
        )
      }
    })
  })
}

// RestaurantPoint.barChart('$cuisine')

module.exports = {
  RestaurantPoint
}
