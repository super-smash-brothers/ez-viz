// const axios = require('axios')
const dataSet = require('./restaurant-points/restaurant')
// const dataSet2 = require('./restaurant.json')
var fs = require('fs')

const grabInfo = () => {
  let dict = []
  let i = 0
  let j = 1
  var d1 = Date.parse('2018-02-03')
  dataSet.forEach(element => {
    var d2 = Date.parse(element[16])
    if (d1 < d2) {
      let data = {}
      //name, cusine, inspection date, violationcode, description, criticalflag, score, grade, grade date,
      //latitude, longitude, nta
      data.name = element[9]
      data.location = {
        type: 'Point',
        coordinates: [parseFloat(element[27]), parseFloat(element[26])]
      }
      data.borough = element[10]
      data.cuisine = element[15]
      data.inspectionDate = element[16]
      data.violationCode = element[18]
      data.violationDescription = element[19]
      data.criticalFlag = element[20]
      data.score = parseInt(element[21], 10)
      data.recordDate = element[24]
      data.nta = element[33]
      dict.push(data)
      i++
      console.log(i)
      if (i === 10000) {
        fs.writeFile(`restaurant${j}.json`, JSON.stringify(dict), error =>
          console.log(error)
        )
        i = 0
        dict = []
        j++
      }
    }
  })
}

// const grabInfo2 = () => {
//   let dict = []
//   var d1 = Date.parse("2018-02-03");
//   for (let i = 0; i < 3; i++) {
//     var d2 = Date.parse(dataSet[i][16]);
//     if (d1 < d2) {
//       let data = {}
//       //name, cusine, inspection date, violationcode, description, criticalflag, score, grade, grade date,
//       //latitude, longitude, nta
//       data.name = dataSet[i][9]
//       data.borough = dataSet[i][10]
//       data.cuisine = dataSet[i][15]
//       data.inspectionDate = dataSet[i][16]
//       data.violationCode = dataSet[i][18]
//       data.violationDescription = dataSet[i][19]
//       data.criticalFlag = dataSet[i][20]
//       data.score = dataSet[i][21]
//       data.recordDate = dataSet[i][24]
//       data.coordinates = [parseFloat(dataSet[i][26]), parseFloat(dataSet[i][27])]
//       data.nta = dataSet[i][33]
//       dict.push(data)
//       console.log(i)
//     }
//   }
//   fs.writeFile('restaurant.json', JSON.stringify(dict), (error) => console.log(error))
// }

// console.log(dataSet2)
grabInfo()
