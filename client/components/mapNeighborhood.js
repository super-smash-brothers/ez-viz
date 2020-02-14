import React, {useEffect, useState} from 'react' // Cleanup?
import * as d3 from 'd3'
import axios from 'axios'
import BarChart from './chartBar'
import Tooltip from './module/Tooltip'

export const MapNeighborhood = props => {
  const {
    line,
    xScale,
    yScale,
    neighborhood,
    width, // Cleanup?
    height, // Cleanup?
    passedData,
    colorScale,
    setBarData,
    barData, // Cleanup?
    setPassedGrades,
    grades,
    filter
  } = props
  const [borderWidth, setBorderWidth] = useState('0.5')
  const [tooltip, setTooltip] = useState(false)

  // Cleanup?
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
    <g className="neighborhood">
      <path
        key={neighborhood._id}
        d={line(neighborhood.geometry.coordinates[0])}
        onClick={() => {
          setPassedGrades(grades)
          setBarData({
            NTACode: neighborhood.properties.NTACode,
            NTAName: neighborhood.properties.NTAName
          })
        }}
        strokeWidth={borderWidth}
        fill={passedData ? colorScale(passedData.passed) : 'white'}
        stroke="#eb6a5b"
        onMouseEnter={event => {
          if (passedData && passedData.passed) setBorderWidth('6')
          console.log('hover event:', event)
          setTooltip({event, neighborhood})
        }}
        onMouseLeave={() => {
          if (passedData && passedData.passed) setBorderWidth('0.5')
          setTooltip(false)
        }}
      />
      <title>{neighborhood.properties.NTAName}</title>
      {tooltip && (
        <Tooltip nta={neighborhood} xScale={xScale} yScale={yScale} />
      )}
    </g>
  )
}
