import React from 'react'
import * as d3 from 'd3'

//put a single neighborhood's coordinates in a json to use
// console.log('d3', d3)
export const MapNeighborhood = props => {
  // console.log('props: ', props.neighborhood.geometry.coordinates[0])
  const {line, xScale, yScale, neighborhood, width, height} = props

  if (neighborhood.geometry.type === 'MultiPolygon') {
    return neighborhood.geometry.coordinates[0].map(lines => {
      console.log('lines: ', line(lines[0][0]))
      return (
        <path d={line(lines)} strokeWidth="2" fill="none" stroke="#eb6a5b" />
      )
    })
  }
  return (
    <path
      d={line(neighborhood.geometry.coordinates[0])}
      strokeWidth="2"
      fill="none"
      stroke="#eb6a5b"
    />
  )
}
