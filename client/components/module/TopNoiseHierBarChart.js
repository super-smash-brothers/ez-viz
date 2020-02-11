import React, {useEffect, useRef, useState, Fragment} from 'react'
import axios from 'axios'
import * as d3 from 'd3'
import Loader from './Loader'

const TopNoiseHierBarChart = props => {
  // Create our State vars
  const [nta, setNTAState] = useState(props) // NTA Data
  const [topNoises, setTopNoises] = useState([]) // top noises
  const [scales, setScales] = useState([]) // Scales for rendering our chart

  // Chart dimensions
  const height = 260
  const width = 600
  const margin = {top: 40, bottom: 40, right: 40, left: 40}

  // We use the `useRef()` hooks to grab the JSX elements that will render
  // our X- and Y-axis labels
  const xAxisGroup = useRef()
  const yAxisGroup = useRef()

  // Essentially our componentDidMount and componentDidUpdate
  // Dependency: nta
  useEffect(
    () => {
      // this self-invoking function is preceded by a semi-colon so it's never
      // accidentally run as a list of arguments for a previous statement.
      ;(async function getTopNoises() {
        // for reference - props.barData = {NTACode: "BK31"}
        // console.log('props.barData', props.barData)
        // get our data and put it on state
        const {data} = await axios.get(
          `/api/noises/topnoises/${props.barData.NTACode}`
        )
        console.log('topnoises', data)
        console.log('map0', data.map(elem => elem[0]))
        console.log('map1', [...data.map(elem => elem[1]), 0])
        setTopNoises(data.reverse()) // put the high value at the top

        // set our X-axis scale. scaleBand() for our discrete X values.
        const yScale = d3 // y-axis now holds names
          .scaleBand()
          .domain(data.map(elem => elem[0]))
          .range([height, 0])

        // set our Y-axis scale. Using 0 in the domain lets us show a more
        // significant block for our minimum value
        const xScale = d3 // x-axis now holds values
          .scaleLinear()
          .domain(d3.extent([...data.map(elem => elem[1]), 0]))
          .range([0, width])
        setScales([xScale, yScale])

        // create and assign our axis labels
        const xAxis = d3.axisBottom()
        const yAxis = d3.axisRight()
        console.log('scales are:', scales)
        xAxis.scale(xScale)
        d3.select(xAxisGroup.current).call(xAxis)
        yAxis.scale(yScale)
        d3.select(yAxisGroup.current).call(yAxis)
      })()
    },
    [nta]
  )

  // g tags will host our x- and y-axis labels
  // scales[0] = our xScale function
  // scales[1] = our yScale function
  // the + 1 in our rect x formula is to offset from the y-axis bar
  return (
    <Fragment>
      {scales.length ? (
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          {topNoises.map((element, index) => {
            console.log('map', element, index)
            console.log('scales0', scales[0])
            console.log('elem0', element[0])
            console.log('elem1', element[1])
            console.log('scales0elem1', scales[0](element[1]))
            return (
              <g key={element[0]}>
                <rect
                  data-scale={scales[0](element[1])}
                  y={
                    Math.abs(4 - index) * scales[1].bandwidth() + margin.top + 5
                  } // center from the - 10
                  x={margin.left + 1} // + 1 to show the y axis line
                  height={scales[1].bandwidth() - 10}
                  width={scales[0](element[1])}
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

export default TopNoiseHierBarChart
