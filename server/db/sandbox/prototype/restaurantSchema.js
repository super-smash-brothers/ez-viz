const mongoose = require('mongoose')
// const NTASlice2 = require('../ntaSlice2')
const {NeighborPoly} = require('../../models/index.js')
mongoose.connect(
  'mongodb+srv://viZ:UnaZiv4JavaMineN0ir@cluster0-hqnuy.mongodb.net/delvenyc',
  {
    useNewUrlParser: true,
    dbName: 'delvenyc'
  }
)
// mongoose.connect('localhost://delvenyc', { useNewUrlParser: true })
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
  violationCode: String,
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
  pastViolation: [String]
})
//creates collection
const restaurantPoint = mongoose.model('restaurantPoint', restaurantSchema)
restaurantPoint
  .aggregate([
    {
      $group: {
        _id: '$nta',
        total: {
          $sum: {
            $toInt: '$score'
          }
        }
      }
    }
  ])
  .then(aggregateData => {
    aggregateData.forEach(data => {
      if (data._id !== null) {
        NeighborPoly.update(
          {'properties.NTACode': data._id},
          {$set: {'properties.aggregateFoodGrade': data.total / data.count}},
          {upsert: true},
          err => {
            console.error(err)
            // console.log('hits')
            // 'needs this annonymous callback because save middle ware is not triggered when just doing an update'
          }
        )
      }
    })
  })
  .catch(err => {
    console.error(err)
  })
