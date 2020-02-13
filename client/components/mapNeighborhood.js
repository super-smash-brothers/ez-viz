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
    barData,
    setPassedGrades,
    grades,
    filter
  } = props
  // if (passedData) console.log('this passed', passedData)
  const [borderWidth, setBorderWidth] = useState('0.5')
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
          onClick={
            filter && filter.length
              ? () => {
                  setPassedGrades(grades)
                  setBarData({
                    NTACode: neighborhood.properties.NTACode,
                    NTAName: neighborhood.properties.NTAName,
                    neighborhood: neighborhood
                  })
                }
              : null
          }
          strokeWidth={borderWidth}
          fill={passedData ? colorScale(passedData.passed) : 'white'}
          stroke="#eb6a5b"
        >
          <title>{neighborhood.properties.NTAName}</title>
        </path>
      )
    })
  }

  return (
    <path
      key={neighborhood._id}
      d={line(neighborhood.geometry.coordinates[0])}
      onClick={
        filter && filter.length
          ? () => {
              setPassedGrades(grades)
              setBarData({
                NTACode: neighborhood.properties.NTACode,
                NTAName: neighborhood.properties.NTAName,
                neighborhood: neighborhood
              })
            }
          : null
      }
      strokeWidth={borderWidth}
      fill={passedData ? colorScale(passedData.passed) : 'white'}
      stroke="#eb6a5b"
      onMouseEnter={
        passedData && passedData.passed ? () => setBorderWidth('6') : null
      }
      onMouseLeave={
        passedData && passedData.passed ? () => setBorderWidth('0.5') : null
      }
    >
      <title>{neighborhood.properties.NTAName}</title>
    </path>
  )
}
