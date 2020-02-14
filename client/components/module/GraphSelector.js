import React from 'react'
import CuisinesBarChart from './CuisinesBarChart'
import {FoodGradePieChart} from './GradePieChart'
import TopNoiseHierBarChart from './TopNoiseHierBarChart'
import RelativePopulationChart from './RelativePopulationChart'
import {MapNeighborhood} from '../mapNeighborhood'
import * as d3 from 'd3'
import CrimeTimeChart from './CrimeTimeChart'

const GraphSelector = ({filter, ntaCode, grades}) => {
  let coordXExtent
  let coordYExtent
  let allCoordArray = []

  console.log('my ntaCode: ', ntaCode)
  const multiPolygonConverter = arr => {
    for (let i = 0; i < arr.length; i++) {
      Array.isArray(arr[i]) && arr[i].length !== 2
        ? multiPolygonConverter(arr[i])
        : allCoordArray.push(arr[i])
    }
  }
  if (ntaCode.neighborhood.geometry.type === 'MultiPolygon') {
    multiPolygonConverter(ntaCode.neighborhood.geometry.coordinates)
    coordYExtent = d3.extent(allCoordArray, c => c[1])
    coordXExtent = d3.extent(allCoordArray, c => c[0])
  } else {
    coordXExtent = d3.extent(
      ntaCode.neighborhood.geometry.coordinates[0],
      c => c[0]
    )
    coordYExtent = d3.extent(
      ntaCode.neighborhood.geometry.coordinates[0],
      c => c[1]
    )
  }

  const width = '260px'
  const height = '200px'
  const xScale = d3
    .scaleLinear()
    .domain(coordXExtent)
    .range([0, 260])

  const yScale = d3
    .scaleLinear()
    .domain(coordYExtent)
    .range([200, 0])

  const line = d3
    .line()
    .x(d => {
      return xScale(d[0])
    })
    .y(d => {
      return yScale(d[1])
    })
  switch (filter) {
    case 'food':
      // Refactor this to break down graph items into further components
      return (
        <div className="graph-items-content">
          <div className="graph-item-container">
            <h2 className="graph-item__title">{ntaCode.NTAName}</h2>
            <h2 className="graph-item__title">Top 5 Neighborhood Cuisines</h2>
            <CuisinesBarChart ntaCode={ntaCode} />
          </div>
          <div className="graph-item-container">
            <h2 className="graph-item__title">Distribution of Health Scores</h2>
            <div style={{textShadow: '1px 1px black'}}>
              <strong>
                <font color="green">A </font>
                <font color="yellow">B </font>
                <font color="red">C or lower</font>
              </strong>
            </div>
            <FoodGradePieChart grades={grades} ntaCode={ntaCode} />
          </div>
        </div>
      )
    case 'population':
      return (
        <div className="graph-items-content">
          <div className="graph-item-container">
            <h2 className="graph-item__title">{ntaCode.NTAName}</h2>
            <h2 className="graph-item__title">
              Relative Population by Neighborhood
            </h2>
            <RelativePopulationChart ntaCode={ntaCode} />
          </div>
        </div>
      )
    case 'noise':
      return (
        <div className="graph-items-content">
          <div className="graph-item-container">
            <h2 className="graph-item__title">{ntaCode.NTAName}</h2>
            <h2 className="graph-item__title">Top 5 Noise Complaints</h2>
            <TopNoiseHierBarChart ntaCode={ntaCode} />
          </div>
        </div>
      )
    case 'crime':
      return (
        <div className="graph-items-content">
          <div className="graph-item-container">
            <h2 className="graph-item__title">{ntaCode.NTAName}</h2>
            <h2 className="graph-item__title">Crime Over Time</h2>
            <CrimeTimeChart ntaCode={ntaCode} />
          </div>
        </div>
      )
    case 'comprehensive':
      return (
        <div className="graph-items-content">
          <div className="graph-item-container">
            <h2 className="graph-item__title">{ntaCode.NTAName}</h2>
            <svg
              width={width}
              height={height}
              className="graph-container-neighborhood"
            >
              <MapNeighborhood
                neighborhood={ntaCode.neighborhood}
                line={line}
                passedData={{passed: 'hi'}}
                colorScale={() => '#B7E2C9'}
              />
            </svg>
            <h2 className="graph-item__title">Top 5 Neighborhood Cuisines</h2>
            <CuisinesBarChart ntaCode={ntaCode} />

            <div className="graph-item-container">
              <h2 className="graph-item__title">
                Distribution of Health Scores
              </h2>
              <div style={{textShadow: '1px 1px black'}}>
                <strong>
                  <font color="green">A </font>
                  <font color="yellow">B </font>
                  <font color="red">C or lower</font>
                </strong>
              </div>
              <FoodGradePieChart grades={grades} ntaCode={ntaCode} />
            </div>
            <h2 className="graph-item__title">
              Relative Population by Neighborhood
            </h2>
            <RelativePopulationChart ntaCode={ntaCode} />
            <h2 className="graph-item__title">Top 5 Noise Complaints</h2>
            <TopNoiseHierBarChart ntaCode={ntaCode} />
            <h2 className="graph-item__title">Crime Over Time</h2>
            <CrimeTimeChart ntaCode={ntaCode} />
          </div>
        </div>
      )
    default:
      return null
  }
}

export default GraphSelector
