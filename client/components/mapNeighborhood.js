import React, {useEffect, useState} from 'react'
import * as d3 from 'd3'
import axios from 'axios'
import BarChart from './chartBar'

export const MapNeighborhood = props => {
  const {
    line,
    xScale,
    yScale,
    neighborhood,
    width,
    height,
    passedData,
    colorScale,
    noiseComplaints,
    setBarData,
    barData,
    neighborhoodPopulation
  } = props
  // console.log('this neighborhood passed', passedData.passed)
  const [borderWidth, setBorderWidth] = useState('0.5')
  // const enterNeighborhood = setBorderWidth(6)
  // const exitNeighborhood = setBorderWidth(0.5)
  // console.log('neighborhood in map: ', neighborhood)
  // console.log('noise complaints: ', noiseComplaints)
  const xExtent = d3.extent(neighborhood.geometry.coordinates[0], n => n[0])
  const yExtent = d3.extent(neighborhood.geometry.coordinates[0], n => n[1])
  // console.log('x and y extent in neighborhood: ', xExtent, yExtent)
  // const neighborhoodComplaints = noiseComplaints.filter(c =>
  //   c.location.latitude > yExtent[0]
  //   && c.location.latitude < yExtent[1]
  //   && c.location.longitude > xExtent[0]
  //   && c.location.longitude < xExtent[1])
  //   console.log('noise complaints', neighborhoodComplaints)
  if (neighborhood.geometry.type === 'MultiPolygon') {
    return neighborhood.geometry.coordinates.map(singlePolygon => {
      return (
        <path
          key={singlePolygon._id}
          d={line(singlePolygon[0])}
          onMouseEnter={() => setBorderWidth('6')}
          onMouseLeave={() => setBorderWidth('0.5')}
          onClick={() => {
            // console.log('neighborhood data', neighborhood.properties.NTACode)
            Object.keys(barData).length
              ? setBarData({})
              : setBarData({NTACode: neighborhood.properties.NTACode})
          }}
          strokeWidth={borderWidth}
          fill={
            passedData ? colorScale(passedData.passed) : 'none'
            // avgFoodScore
            //   ? foodColorScale(avgFoodScore.total / avgFoodScore.count)
            //   : 'none'
          }
          // fill='none'
          stroke="#eb6a5b"
          // opacity='0.5'
        />
      )
    })
  }

  return (
    <path
      key={neighborhood._id}
      d={line(neighborhood.geometry.coordinates[0])}
      onClick={() => {
        // console.log('neighborhood data', neighborhood.properties.NTACode)
        Object.keys(barData).length
          ? setBarData({})
          : setBarData({NTACode: neighborhood.properties.NTACode})
      }}
      strokeWidth={borderWidth}
      fill={
        passedData ? colorScale(passedData.passed) : 'none'
        // avgFoodScore
        //   ? foodColorScale(avgFoodScore.total / avgFoodScore.count)
        //   : 'none'
      }
      stroke="#eb6a5b"
      onMouseEnter={() => setBorderWidth('6')}
      onMouseLeave={() => setBorderWidth('0.5')}
      // opacity='0.5'
    />
  )
}
