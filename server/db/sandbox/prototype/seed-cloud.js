const mongoose = require('mongoose')
require('../../../../secrets') // only include when seeding cloud database
const {NeighborPoly, BoroughPoly, City} = require('./schema')

const NTA = require('../NTA.json')
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
  const city = await City.create({
    name: 'New York',
    aggregateFoodGrade: 'A',
    totalRestaurants: 40000
  })
  console.log('City:', city.name)
}

const seed = async () => {
  console.log('Running seed')
  console.log('Dropping database')
  Object.keys(mongoose.connection.collections).forEach(async collectionName => {
    console.log(`Dropping collection: ${collectionName}`)
    await mongoose.connection.collections[collectionName].drop()
  })
  await seedData()
  console.log('Seed complete')
  mongoose.connection.close() // close connection established by schema.js
}

seed()
