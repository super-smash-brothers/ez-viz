import React, {useEffect, useState} from 'react'
import * as d3 from 'd3'
import axios from 'axios'

export const MapNeighborhood = props => {
  const {
    line,
    xScale,
    yScale,
    neighborhood,
    width,
    height,
    avgFoodScore,
    colorScale,
    noiseComplaints
  } = props
  // console.log('neighborhood in map: ', neighborhood)
  console.log('noise complaints: ', noiseComplaints)
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
          strokeWidth="2"
          fill={
            avgFoodScore
              ? colorScale(avgFoodScore.total / avgFoodScore.count)
              : 'none'
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
      strokeWidth="2"
      fill={
        avgFoodScore
          ? colorScale(avgFoodScore.total / avgFoodScore.count)
          : 'none'
      }
      stroke="#eb6a5b"
      // opacity='0.5'
    />
  )
}
