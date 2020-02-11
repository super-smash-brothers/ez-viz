import React from 'react'
import CuisinesBarChart from './CuisinesBarChart'
import {FoodGradePieChart} from './GradePieChart'

const GraphSelector = ({filter, ntaCode, grades}) => {
  switch (filter) {
    case 'food':
      return (
        <div className="graph-items-content">
          <div className="graph-item-container">
            <h2 className="graph-item__title">Top 5 Restaurants by Grade</h2>
            <CuisinesBarChart ntaCode={ntaCode} />
          </div>
          <div className="graph-item-container">
            <h2 className="graph-item__title">Top 5 Restaurants by Grade</h2>
            <FoodGradePieChart grades={grades} ntaCode={ntaCode} />
          </div>
        </div>
      )
    case 'population':
      console.log('population graph')
      break
    default:
      return null
  }
}

export default GraphSelector
