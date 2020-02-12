import React from 'react'
import CuisinesBarChart from './CuisinesBarChart'
import {FoodGradePieChart} from './GradePieChart'
import TopNoiseHierBarChart from './TopNoiseHierBarChart'
import RelativePopulationChart from './RelativePopulationChart'

const GraphSelector = ({filter, ntaCode, grades}) => {
  console.log(ntaCode)
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
            <strong>
              <font color="green">A</font>
              <font color="yellow">B</font>
              <font color="red">C or lower</font>
            </strong>
            <FoodGradePieChart grades={grades} ntaCode={ntaCode} />
          </div>
        </div>
      )
    case 'population':
      return (
        <div className="graph-items-content">
          <div className="graph-item-container">
            <h2 className="graph-item__title">{ntaCode.NTAName}</h2>
            <h2 className="graph-item__title">Relative Population by NTA</h2>
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
            <h2 className="graph-item__title">Coming soon:</h2>
            Top 5 Offenses
          </div>
        </div>
      )
    default:
      return null
  }
}

export default GraphSelector
