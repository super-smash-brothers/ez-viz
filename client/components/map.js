import React from 'react'
import {default as singleNeighborhood} from '../../public/sandbox/single.json'
//put a single neighborhood's coordinates in a json to use

export class Map extends React.Component {
  constructor() {
    super()
    this.state = singleNeighborhood
  }

  render() {
    //used reduce to add all the lines to the d. The differences are very small, so it's rendering tiny
    return (
      <svg width="250" height="100">
        <path
          d={this.state.reduce((accumulator, current, index) => {
            if (index === 0) {
              return (
                accumulator +
                `M${Math.abs(current[0])},${Math.abs(100 - current[1])}`
              )
            }
            return (
              accumulator +
              `L${Math.abs(current[0])},${Math.abs(100 - current[1])}`
            )
          }, '')}
          strokeWidth="2"
          fill="none"
          stroke="#eb6a5b"
        />
      </svg>
    )
  }
}
