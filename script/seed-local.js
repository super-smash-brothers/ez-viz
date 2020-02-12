/* eslint-disable complexity */
const mongoose = require('mongoose')
const {
  NeighborPoly,
  BoroughPoly,
  CitySchema,
  RestaurantPoint,
  NeighborSum,
  Noise,
  NoiseSum,
  Crime,
  CrimeSum
} = require('../server/db/models/')

const NTA = require('./NTA.json')
const Boro = require('./boro.json')

// Document
const seedPoly = async () => {
  console.log('Seeding polygon data')
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
  console.log('Polygon data seeded')
}

const seedNoise = async () => {
  console.log('Seeding noise data')
  const noiseData = require('./311noisejan10.json')
  for (let i = 0; i < noiseData.length; i++) {
    try {
      const doc = await Noise.create({
        complaint_type: noiseData[i].complaint_type,
        descriptor: noiseData[i].descriptor,
        location: {
          type: 'Point',
          coordinates: [noiseData[i].longitude, noiseData[i].latitude]
        }
      })
      console.log(`Number: ${i}, noise id: ${doc.unique_key}`)
    } catch (error) {
      console.log('Error seeding neighborhoods:', error)
    }
  }
  console.log('Noise data seeded')
}

const seedCrime = async () => {
  console.log('Seeding crime data')
  const crimeData = require('./uip8-fykc.json')
  for (let i = 0; i < crimeData.length; i++) {
    try {
      const doc = await Crime.create({
        OFNS_DESC: crimeData[i].ofns_desc,
        ARREST_DATE: crimeData[i].arrest_date,
        location: {
          type: 'Point',
          coordinates: [crimeData[i].longitude, crimeData[i].latitude]
        }
      })
      console.log(`Number: ${i}, crime id: ${doc.unique_key}`)
    } catch (error) {
      console.log('Error seeding neighborhoods:', error)
    }
  }
  console.log('Crime data seeded')
}

const seedSums = async () => {
  console.log('Seeding restaurant summary data')
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
  console.log('Summary data seeded')
}

const seedNoiseSums = async () => {
  console.log('Seeding noise summary data')
  const allNTA = await NeighborPoly.find()
  const manualMap = []
  for (let i = 0; i < allNTA.length; i++) {
    const singleNTA = allNTA[i]
    const noisePoints = await Noise.find({
      location: {
        $geoWithin: {
          $geometry: singleNTA.geometry
        }
      }
    })
    console.log(
      `singleNTA ${singleNTA.properties.NTACode}, num ${noisePoints.length}`
    )
    manualMap.push([singleNTA.properties.NTACode, noisePoints.length])
  }
  await NoiseSum.create({sumCount: manualMap})
  console.log('Summary data seeded')
}

const seedCrimeSums = async () => {
  console.log('Seeding noise summary data')
  const allNTA = await NeighborPoly.find()
  const manualMap = []
  for (let i = 0; i < allNTA.length; i++) {
    const singleNTA = allNTA[i]
    const crimePoints = await Crime.find({
      location: {
        $geoWithin: {
          $geometry: singleNTA.geometry
        }
      }
    })
    // console.log(
    //   `singleNTA ${singleNTA.properties.NTACode}, num ${crimePoints.length}`
    // )
    manualMap.push([singleNTA.properties.NTACode, crimePoints.length])
  }
  await CrimeSum.create({sumCount: manualMap})
  console.log('Summary data seeded')
}

const seedPoints = async () => {
  // originally taken from /server/db/models/restaurant.js
  console.log('Seeding restaurant points')
  const totalComponentFiles = 27
  let currentComponent
  for (let i = 1; i <= totalComponentFiles; i++) {
    currentComponent = require(`./restaurant${i}.json`)
    if (currentComponent === undefined) {
      console.log('Check path for component files in seed file')
      break
    }
    console.log('Processing component file:', i)
    await RestaurantPoint.insertMany(currentComponent, (err, ele) => {
      if (err) console.log(err)
      console.log(ele)
    })
    console.log('Component file processed:', i)
  }
  console.log('Point data seeded')
}

const seed = async () => {
  // console.log('Running seed')
  // console.log('Dropping database')
  // Object.keys(mongoose.connection.collections).forEach(async collectionName => {
  //   console.log(`Dropping collection: ${collectionName}`)
  //   await mongoose.connection.collections[collectionName].drop()
  // })
  // await seedPoly()
  // await seedNoise()
  // await seedNoiseSums()
  // await seedCrime()
  // await seedCrimeSums()
  // await seedSums()
  // await seedPoints()
  // console.log('Seed complete')
  mongoose.connection.close() // close connection established by schema.js
}

seed()
