import React from 'react'
import {default as barChartData} from '../../public/barChartData.json'
// public/barChartData.js

export class BarChart extends React.Component {
  constructor() {
    super()
    this.state = barChartData
  }

  render() {
    console.log('getting data: ', this.state)
    return (
      <svg width="250" height="100">
        {this.state.map((temp, index) => {
          return (
            <rect
              key={index}
              x={index * 8}
              y={temp.high}
              width="4"
              height={temp.high - temp.low}
              fill="#e3e969"
            />
          )
        })}
      </svg>
    )
  }
}
