import React from 'react'
import {default as barChartData} from '../../public/barChartData.json'
// public/barChartData.js

export class LineChart extends React.Component {
  constructor() {
    super()
    this.state = barChartData
  }

  render() {
    return (
      <svg width="250" height="100">
        <path
          d={this.state.reduce((accumulator, current, index) => {
            if (index === 0) {
              return accumulator + `M${index * 8},${100 - current.high}`
            }
            return accumulator + `L${index * 8},${100 - current.high}`
          }, '')}
          strokeWidth="2"
          fill="none"
          stroke="blue"
        />
        <path
          d={this.state.reduce((accumulator, current, index) => {
            if (index === 0) {
              return accumulator + `M${index * 8},${100 - current.low}`
            }
            return accumulator + `L${index * 8},${100 - current.low}`
          }, '')}
          strokeWidth="2"
          fill="none"
          stroke="#eb6a5b"
        />
      </svg>
    )
  }
}
