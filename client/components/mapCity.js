import React, {useState, useEffect} from 'react'
import * as d3 from 'd3'
import {default as singleNeighborhood} from '../../public/sandbox/single.json'
import {default as allNeighborhoods} from '../../public/sandbox/NTA.json'
import {MapNeighborhood} from './mapNeighborhood'
import axios from 'axios'
import BarChart from './chartBar'

//put a single neighborhood's coordinates in a json to use
// console.log('d3', d3)
export function CityMap(props) {
  const [data, setMap] = useState({})
  const [foodScores, setFoodScores] = useState({})
  useEffect(() => {
    async function fetchData() {
      const calledNeighborhood = await axios.get('/api/neighborhoods')
      setMap(calledNeighborhood.data)
    }
    async function fetchFoodScoreData() {
      const foodScoreData = await axios.get('/api/neighborhoods/foodscore')
      setFoodScores(foodScoreData.data)
    }
    fetchData()
    fetchFoodScoreData()
  }, [])
  // console.log('food score data: ', foodScores)
  // console.log('neighborhood data: ', data)
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
  // }
  // console.log('all averages: ', allAverages)
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
    .domain([11.066666666666666, 18.1, 25.468926553672315])
    .range(['white', 'yellow', 'blue'])
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

  return Object.keys(data).length ? (
    <svg width={width} height={height}>
      {data.features.map(neighborhood => {
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
            colorScale={colorScale}
          />
        )
      })}
    </svg>
  ) : (
    <h2>no data loaded</h2>
  )
}
