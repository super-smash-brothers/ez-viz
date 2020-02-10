import React, {useEffect, useRef, useState, setState, Fragment} from 'react'
import {default as barChartData} from '../../public/barChartData.json'
// public/barChartData.js
import axios from 'axios'
import * as d3 from 'd3'

const BarChart = props => {
  const [nta, setNTAState] = useState(props)
  const [cuisines, setCuisines] = useState([])
  const [scales, setScales] = useState([])

  const height = 260
  const width = 600
  const padding = 40
  const margin = {top: 20, bottom: 20, right: 20, left: 40}

  const xAxisGroup = useRef()
  const yAxisGroup = useRef()

  useEffect(
    () => {
      ;(async function getCusine() {
        const {data} = await axios.get('/api/restaurants/cuisine/MN17')
        setCuisines(data.cuisineObjects)
        const xScale = d3
          .scaleBand()
          .domain(data.cuisineNames)
          .range([0, width])
        const yScale = d3
          .scaleLinear()
          .domain(d3.extent(data.counts))
          .range([height, margin.bottom])
        setScales([xScale, yScale])

        // if (scales.length) {
        const xAxis = d3.axisBottom()
        const yAxis = d3.axisLeft()
        console.log('scales are:', scales)
        xAxis.scale(xScale)
        d3.select(xAxisGroup.current).call(xAxis)
        yAxis.scale(yScale)
        d3.select(yAxisGroup.current).call(yAxis)
        // }
      })()
    },
    [nta]
  )

  return (
    <Fragment>
      {scales.length ? (
        <svg width={width + margin.right} height={height}>
          <g
            ref={xAxisGroup}
            transform={`translate(${margin.left}, ${height - margin.bottom})`}
          />
          <g
            ref={yAxisGroup}
            transform={`translate(${margin.left}, -${margin.bottom})`}
          />
          {cuisines.map((element, index) => {
            console.log('element is: ', element)
            console.log(element.count, scales[1](element.count))
            return (
              <g key={element._id}>
                <rect
                  data-scale={scales[1](element.count)}
                  x={index * scales[0].bandwidth() + margin.left + 1}
                  y={scales[1](element.count) - margin.bottom}
                  width={scales[0].bandwidth() - 10}
                  height={height - scales[1](element.count)}
                  fill="#e3e769"
                />
                <text>{element.count}</text>
              </g>
            )
          })}
        </svg>
      ) : (
        <div> waiting ...</div>
      )}
    </Fragment>
  )
}

// class BarChart extends React.Component {
//   constructor() {
//     super()
//     this.state = barChartData
//   }
//   render() {
//     console.log('hitting')
//     return (
//       <svg width="250" height="100">
//         {this.state.map((temp, index) => {
//           return (
// <rect
//   key={index}
//   x={index * 8}
//   y={temp.high}
//   width="4"
//   height={temp.high - temp.low}
//   fill="#e3e969"
// />
//           )
//         })}
//       </svg>
//     )
//   }
// }

export default BarChart
