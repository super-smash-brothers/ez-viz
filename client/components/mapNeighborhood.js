import React from 'react'
import * as d3 from 'd3'
import {default as singleNeighborhood} from '../../public/sandbox/single.json'
//put a single neighborhood's coordinates in a json to use
// console.log('d3', d3)
export class MapNeighborhood extends React.Component {
  constructor() {
    super()
    this.state = singleNeighborhood
  }

  render() {
    //used reduce to add all the lines to the d. The differences are very small, so it's rendering tiny
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
    const height = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )
    //These variables fit the window we are rendering in to fit the space available
    // console.log('single neighborhood: ', singleNeighborhood[0], 'd3:', d3)
    const xExtent = d3.extent(singleNeighborhood, l => l[0])
    //.extent returns an array with two values, the lowest and highest values fed to it respectively
    //.extent takes an iterable argument, then loops through finds the lowest and highest
    const xScale = d3
      .scaleLinear()
      .domain(xExtent)
      .range([0, width])
    //.scaleLinear is one of many scale... methods that takes the range of values it will recieve then the range of values it needs to return to fit the situation
    //this returns a function, which takes the value within the domain originally given, then scales them

    const yExtent = d3.extent(singleNeighborhood, l => l[1])
    const yScale = d3
      .scaleLinear()
      .domain(yExtent)
      .range([height, 0])
    // console.log('xExtent: ', xExtent)
    // console.log('yExtent: ', yExtent)
    const line = d3
      .line()
      .x(d => {
        return xScale(d[0])
      })
      .y(d => {
        return yScale(d[1])
      })
    //.line is meant to write the d-path for the <path> component. It uses the scale we set up above to draw the properly scaled values
    // console.log(line(singleNeighborhood))

    return (
      <p>
        <svg width={width} height={height}>
          <path
            d={line(singleNeighborhood)}
            // {this.state.reduce((accumulator, current, index) => {
            //   if (index === 0) {
            //     return (
            //       accumulator +
            //       `M${Math.abs(current[0])},${100 - current[1]}`
            //       )
            //     }
            //     return (
            //       accumulator +
            //       `L${Math.abs(current[0])},${100 - current[1]}`
            //       )
            //     }, '')}
            strokeWidth="2"
            fill="blue"
            stroke="#eb6a5b"
          />
        </svg>
      </p>
    )
  }
}
