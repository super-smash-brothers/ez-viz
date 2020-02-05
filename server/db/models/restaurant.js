const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/delvenyc', {useNewUrlParser: true})
const {NeighborhoodSchema} = require('./')

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

const restaurantPoint = mongoose.model('restaurantPoint', restaurantSchema)

//Caches aggregateFoodGrade running seed
restaurantSchema.aggregateFoodGrade = () => {
  restaurantPoint
    .aggregate([
      {
        $group: {
          _id: '$nta',
          total: {
            $sum: {
              $toInt: '$score'
            }
          },
          count: {$sum: 1}
        }
      }
    ])
    .then(aggregateData => {
      aggregateData.forEach(data => {
        if (data._id !== null) {
          NeighborhoodSchema.update(
            {'properties.NTACode': data._id},
            {$set: {'properties.aggregateFoodGrade': data.total / data.count}},
            () => {
              console.log(
                'needs this annonymous callback because save middle ware is not triggered when just doing an update'
              )
            }
          )
        }
      })
    })
}

// restaurantPoint.barChart('$cuisine')

module.exports = {
  restaurantPoint
}
