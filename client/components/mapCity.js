import React, {useState, useEffect} from 'react'
import * as d3 from 'd3'
import {default as singleNeighborhood} from '../../public/sandbox/single.json'
import {default as allNeighborhoods} from '../../public/sandbox/NTA.json'
import {MapNeighborhood} from './mapNeighborhood'
import {BarChart} from './chartBar'
import axios from 'axios'

//put a single neighborhood's coordinates in a json to use
// console.log('d3', d3)
export function CityMap() {
  const [data, setMap] = useState({})
  const [foodScores, setFoodScores] = useState({})
  const [noiseComplaints, setNoiseComplaints] = useState({})
  const [neighborhoodPopulation, setCityPopulation] = useState({})
  const [crime, setCrime] = useState({})
  useEffect(() => {
    async function fetchCrime() {
      const crimeData = await axios.get(
        'https://data.cityofnewyork.us/resource/uip8-fykc.json'
      )
      setCrime(crimeData.data)
    }
    async function fetchData() {
      const calledNeighborhood = await axios.get('/api/neighborhoods')
      setMap(calledNeighborhood.data)
    }
    async function fetchFoodScoreData() {
      const foodScoreData = await axios.get('/api/neighborhoods/foodscore')
      setFoodScores(foodScoreData.data)
    }
    async function fetchNoiseData() {
      let data311 = await axios.get(
        'https://data.cityofnewyork.us/resource/erm2-nwe9.json'
      )
      const noiseData = data311.data.filter(d =>
        d.complaint_type.includes('Noise')
      )
      setNoiseComplaints(noiseData)
    }
    async function fetchPopulationData() {
      const rawPopData = await axios.get(
        'https://data.cityofnewyork.us/resource/swpk-hqdp.json'
      )
      const recentPopData = rawPopData.data.filter(p => p.year === '2010')
      setCityPopulation(recentPopData)
    }
    fetchData()
    fetchFoodScoreData()
    fetchNoiseData()
    fetchPopulationData()
    fetchCrime()
  }, [])

  // console.log('noise data:', noiseComplaints)
  // console.log('food score data: ', foodScores)
  // console.log('neighborhood data: ', data)
  console.log('pop data: ', neighborhoodPopulation)
  const height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
  const width = height * 1.32465263323

  // The lines below are how we found our range of food grades, so that they could be used to set the domain and range of color values.
  // We decided to hard code the numbers to save time, since the numbers are static
  // let allAverages
  // if (Object.keys(foodScores).length) {
  //   allAverages = foodScores.map(element => element.total/element.count)
  //   const averagesHighLow = d3.extent(allAverages, l => l)
  //   console.log('our averages: ', averagesHighLow)
  //   console.log('all averages: ', allAverages.sort())
  // }
  const xScale = d3
    .scaleLinear()
    .domain([-74.2555928790719, -73.7000104153247])
    .range([0, width])

  // const yExtent = d3.extent(singleNeighborhood, l => l[1])
  const yScale = d3
    .scaleLinear()
    .domain([40.4961236003829, 40.9155410761847])
    .range([height, 0])

  const colorScale = d3
    .scaleLinear()
    .domain([13.119565217391305, 25.468926553672315])
    .range(['black', 'white'])
    .interpolate(d3.interpolateRgb.gamma(2.2))

  // console.log('colorScale: ', colorScale(15))

  const line = d3
    .line()
    .x(d => {
      return xScale(d[0])
    })
    .y(d => {
      return yScale(d[1])
    })

  return (
    <svg width={width} height={height}>
      {Object.keys(data).length ? (
        data.features.map(neighborhood => {
          // console.log('in search of nta', neighborhood.properties.NTACode)
          return (
            <MapNeighborhood
              key={neighborhood.id}
              line={line}
              xScale={xScale}
              yScale={yScale}
              neighborhood={neighborhood}
              width={width}
              height={height}
              avgFoodScore={foodScores.find(
                element => element._id === neighborhood.properties.NTACode
              )}
              noiseComplaints={noiseComplaints}
              colorScale={colorScale}
            />
          )
        })
      ) : (
        <h2>no data loaded</h2>
      )}
      {/* <BarChart /> */}
    </svg>
  )
}
