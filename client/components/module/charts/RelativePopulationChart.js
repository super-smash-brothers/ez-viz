import React, {useEffect, useRef, useState, Fragment} from 'react'
import axios from 'axios'
import * as d3 from 'd3'
import Loader from '../Loader'

const RelativePopulationChart = props => {
  //Create our State
  const [nta] = useState(props)
  const [relativePop, setRelativePop] = useState([])
  const [scales, setScales] = useState([])

  //Chart dimensions
  const height = 260
  const width = 600
  const margin = {top: 40, bottom: 40, right: 40, left: 40}

  // We use the `useRef()` hooks to grab the JSX elements that will render
  // our X- and Y-axis labels
  const xAxisGroup = useRef()
  const yAxisGroup = useRef()

  // Dependency: nta
  // Where we will do our axios call and set scale
  useEffect(
    () => {
      ;(async function getRelativePop() {
        // console.log('props nta name:', props.ntaCode)
        const {data} = await axios.get(
          `/api/populations/relative/${props.ntaCode.NTACode}`
        )
        //put the high value at the top
        data.relative.reverse()
        setRelativePop(data.relative)
        const yScale = d3 // y-axis now holds names
          .scaleBand()
          .domain(data.relative.map(elem => elem.ntaName))
          .range([height, 0])

        // set our Y-axis scale. Using 0 in the domain lets us show a more
        // significant block for our minimum value
        const xScale = d3 // x-axis now holds values
          .scaleLinear()
          .domain(
            d3.extent([
              ...data.relative.map(elem => elem.count),
              data.relative[4].count / 10
            ])
          )
          .range([0, width])
        setScales([xScale, yScale])

        // create and assign our axis labels
        const xAxis = d3.axisBottom()
        const yAxis = d3.axisRight()
        xAxis.scale(xScale)
        d3.select(xAxisGroup.current).call(xAxis)
        yAxis.scale(yScale)
        d3.select(yAxisGroup.current).call(yAxis)

        d3
          .selectAll('.popRect')
          .data([
            {width: xScale(data.relative[0].count)},
            {width: xScale(data.relative[1].count)},
            {width: xScale(data.relative[2].count)},
            {width: xScale(data.relative[3].count)},
            {width: xScale(data.relative[4].count)}
          ])
          .transition()
          .duration(750)
          .attr('width', d => d.width)
      })()
    },
    [nta]
  )
  return (
    <Fragment>
      {scales.length ? (
        <svg
          className="graph-item"
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          {relativePop.map((element, index) => {
            return (
              <g key={element.nta}>
                <rect
                  className="popRect"
                  data-scale={scales[0](element.count)}
                  y={
                    Math.abs(4 - index) * scales[1].bandwidth() + margin.top + 5
                  } // center from the - 10
                  x={margin.left + 1} // + 1 to show the y axis line
                  height={scales[1].bandwidth() - 10}
                  fill="#e3e769"
                />
              </g>
            )
          })}
          <g
            ref={xAxisGroup}
            transform={`translate(${margin.left}, ${height + margin.top})`}
          />
          <g
            ref={yAxisGroup}
            transform={`translate(${margin.left}, ${margin.top})`}
          />
        </svg>
      ) : (
        <Loader />
      )}
    </Fragment>
  )
}

export default RelativePopulationChart
