import React, {useEffect} from 'react'
import * as d3 from 'd3'
import axios from 'axios'

export const MapNeighborhood = props => {
  const {line, xScale, yScale, neighborhood, width, height} = props

  // useEffect(async () =>  {
  //   const calledNeighborhood = await axios.get('/api/neighborhoods')
  //   console.log('the axios call: ', calledNeighborhood)
  // })

  if (neighborhood.geometry.type === 'MultiPolygon') {
    return neighborhood.geometry.coordinates.map(singlePolygon => {
      return (
        <path
          d={line(singlePolygon[0])}
          strokeWidth="2"
          fill="none"
          stroke="#eb6a5b"
        />
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
