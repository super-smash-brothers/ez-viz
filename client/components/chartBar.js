import React, {useEffect, useState, setState, Fragment} from 'react'
import {default as barChartData} from '../../public/barChartData.json'
import axios from 'axios'
// public/barChartData.js
import * as d3 from 'd3'

const BarChart = props => {
  const [nta, setNTAState] = useState(props)
  const [cuisines, gotCuisines] = useState([])
  const [scales, gotScales] = useState([])

  const height = 200
  const width = 300
  const padding = 40
  useEffect(
    () => {
      async function getCusine() {
        const {data} = await axios.get('/api/restaurants/cuisine/MN17')
        gotCuisines(data.cuisineObjects)
        const xScale = d3
          .scaleBand()
          .range([0, width])
          .domain(data.cuisineNames)
        const yScale = d3
          .scaleLog()
          .range([height / 2, 0])
          .domain(d3.extent(data.counts))
        gotScales([xScale, yScale])
      }
      getCusine()
    },
    [nta]
  )

  return (
    <Fragment>
      {scales.length ? (
        <svg width={width} height={height} transform=" rotate(180)">
          {cuisines.map((element, index) => {
            console.log(element.count, scales[1](element.count))
            return (
              <g key={element._id}>
                <rect
                  x={index * scales[0].bandwidth()}
                  y={0}
                  width={scales[0].bandwidth() - 10}
                  height={height - scales[1](element.count)}
                  fill="#e3e769"
                />
                <text position="absolute">{element.count}</text>
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
