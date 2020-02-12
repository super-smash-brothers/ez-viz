import React from 'react'
import * as d3 from 'd3'
import {legendColor} from 'd3-svg-legend'

// console.log('legendColor = ', legendColor)
// console.log('popColorSCale = ', popColorScale)

// const legendLinear = legendColor()
//   .shapeWidth(30)
//   .cells(10)
//   .orient('hoizontal')
//   .scale(popColorScale)

// const legendBox = d3.select('.legendLinear').call(legendLinear)
// console.log('legendLinear = ', legendLinear)

const Legend = ({filter}) => {
  const width = 240
  const height = 10

  const colors = {
    food: 'brown',
    crime: 'red',
    noise: 'yellow',
    population: 'purple'
  }
  console.log('filter = ', filter)
  const barScale = d3
    .scaleLinear()
    .domain([1, 10])
    .range(['white', colors[filter]])
    .interpolate(d3.interpolateRgb.gamma(2.2))

  console.log('barscale', barScale(0), ', ', barScale(100))

  const rectColors = []
  for (let i = 0; i < 10; i++) {
    rectColors.push(i)
  }

  return (
    <div className="legend-choropleth">
      <strong className="legend-title">Legend</strong>
      <svg className="legend-choropleth-graphic">
        {rectColors.map((el, i) => {
          return (
            <rect
              key={el}
              x={i * 24}
              y={0}
              width={width / 10}
              height={height}
              fill={barScale(el)}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default Legend
