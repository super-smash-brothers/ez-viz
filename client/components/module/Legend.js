import React from 'react'
import * as d3 from 'd3'

const Legend = ({filter}) => {
  const width = 240
  const height = 10
  console.log('filter is', filter)
  const legendData = {
    food: {
      title: 'Food Grade',
      color: 'brown',
      spectrum: ['Best', 'Worst']
    },
    crime: {
      title: 'Crime Rates',
      color: 'red',
      spectrum: ['Lowest', 'Highest']
    },
    noise: {
      title: 'Noise Complaints',
      color: 'yellow',
      spectrum: ['Lowest', 'Highest']
    },
    population: {
      title: 'Population',
      color: 'purple',
      spectrum: ['Lowest', 'Highest']
    }
  }

  const barScale = d3
    .scaleLinear()
    .domain([1, 10])
    .range(['white', legendData[filter].color])
    .interpolate(d3.interpolateRgb.gamma(2.2))

  const rectColors = []
  for (let i = 0; i < 10; i++) {
    rectColors.push(i)
  }

  return (
    <div className="legend-choropleth">
      <strong className="legend-title">{legendData[filter].title}</strong>
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
      <div className="legend-choropleth-label">
        <div className="legend-choropleth-label__item">
          {legendData[filter].spectrum[0]}
        </div>
        <div className="legend-choropleth-label__item">
          {legendData[filter].spectrum[1]}
        </div>
      </div>
    </div>
  )
}

export default Legend
