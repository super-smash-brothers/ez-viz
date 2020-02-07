/* eslint-disable complexity */
const mongoose = require('mongoose')
const {
  NeighborPoly,
  BoroughPoly,
  CitySchema,
  RestaurantPoint,
  NeighborSum
} = require('../server/db/models/')

const NTA = require('./NTA.json')
const Boro = require('./boro.json')

// Document
const seedData = async () => {
  //  - neighborhoods
  for (let i = 0; i < NTA.features.length; i++) {
    // load all of them
    try {
      const doc = await NeighborPoly.create(NTA.features[i])
      console.log('NTA Polygon id:', doc.id)
    } catch (error) {
      console.log('Error seeding neighborhoods:', error)
    }
  }
  //  - boroughs
  for (let i = 0; i < Boro.features.length; i++) {
    // load all of them
    try {
      const doc = await BoroughPoly.create(Boro.features[i])
      console.log('Boro MultiPolygon id:', doc.id)
    } catch (error) {
      console.log('Error seeding boroughs:', error)
    }
  }
  //  - city
  const city = await CitySchema.create({
    name: 'New York',
    aggregateFoodGrade: 'A',
    totalRestaurants: 40000
  })
  console.log('City:', city.name)
}

const seedSums = async () => {
  const uniqueNTA = await NeighborPoly.distinct(
    'properties.NTACode',
    (err, doc) => {
      console.log(err, doc)
    }
  )
  const manualMap = []
  for (let i = 0; i < uniqueNTA.length; i++) {
    const singleNTA = uniqueNTA[i]
    const letterGradeRange = {A: 0, B: 0, C: 0}
    const NTAPoints = await RestaurantPoint.find({nta: singleNTA})
    for (let j = 0; j < NTAPoints.length; j++) {
      const curNTAPoint = NTAPoints[j]
      if (curNTAPoint.score !== null) {
        if (curNTAPoint.score <= 13 && curNTAPoint.criticalFlag == 'N') {
          letterGradeRange.A++
        } else if (
          curNTAPoint.score > 14 &&
          curNTAPoint.score <= 27 &&
          curNTAPoint.criticalFlag == 'N'
        ) {
          letterGradeRange.B++
        } else {
          letterGradeRange.C++
        }
      }
      console.log('singleNTA, letterGradeRange', [singleNTA, letterGradeRange])
    }
    manualMap.push([singleNTA, letterGradeRange])
  }
  await NeighborSum.create({sumScore: manualMap})
}

const seed = async () => {
  console.log('Running seed')
  // console.log('Dropping database')
  // Object.keys(mongoose.connection.collections).forEach(async collectionName => {
  //   console.log(`Dropping collection: ${collectionName}`)
  //   await mongoose.connection.collections[collectionName].drop()
  // })
  await seedData()
  console.log('Data seeded')
  await seedSums()
  console.log('Summary data seeded')
  console.log('Seed complete')
  mongoose.connection.close() // close connection established by schema.js
}

seed()
