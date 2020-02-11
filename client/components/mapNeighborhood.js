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
    setBarData,
    barData
  } = props
  // if (passedData) console.log('this passed', passedData)
  const [borderWidth, setBorderWidth] = useState('0.5')
  // const enterNeighborhood = setBorderWidth(6)
  // const exitNeighborhood = setBorderWidth(0.5)
  // console.log('neighborhood in map: ', neighborhood)
  // console.log('noise complaints: ', noiseComplaints)
  const xExtent = d3.extent(neighborhood.geometry.coordinates[0], n => n[0])
  const yExtent = d3.extent(neighborhood.geometry.coordinates[0], n => n[1])
  if (neighborhood.geometry.type === 'MultiPolygon') {
    return neighborhood.geometry.coordinates.map(singlePolygon => {
      return (
        <path
          key={singlePolygon._id}
          d={line(singlePolygon[0])}
          onMouseEnter={
            passedData && passedData.passed ? () => setBorderWidth('6') : null
          }
          onMouseLeave={
            passedData && passedData.passed ? () => setBorderWidth('0.5') : null
          }
          onClick={() => {
            // console.log('neighborhood data', neighborhood.properties.NTACode)
            Object.keys(barData).length
              ? setBarData({})
              : setBarData({NTACode: neighborhood.properties.NTACode})
          }}
          strokeWidth={borderWidth}
          fill={
            passedData ? colorScale(passedData.passed) : 'white'
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
        passedData ? colorScale(passedData.passed) : 'white'
        // avgFoodScore
        //   ? foodColorScale(avgFoodScore.total / avgFoodScore.count)
        //   : 'none'
      }
      stroke="#eb6a5b"
      onMouseEnter={
        passedData && passedData.passed ? () => setBorderWidth('6') : null
      }
      onMouseLeave={
        passedData && passedData.passed ? () => setBorderWidth('0.5') : null
      }
      // opacity='0.5'
    />
  )
}
