import React, {useEffect, useRef, useState, Fragment} from 'react'
import axios from 'axios'
import * as d3 from 'd3'
import Loader from '../Loader'

const CuisinesBarChart = props => {
  // Create our State vars
  const [nta, setNTAState] = useState(props) // NTA Data
  const [cuisines, setCuisines] = useState([]) // Cuisines
  const [scales, setScales] = useState([]) // Scales for rendering our chart

  // Chart dimensions
  const height = 260
  const width = 420
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
      ;(async function getCusine() {
        // for reference - props.barData = {NTACode: "BK31"}
        // console.log('props.barData', props.barData)
        // get our data and put it on state
        const {data} = await axios.get(
          `/api/restaurants/cuisine/${props.ntaCode.NTACode}`
        )
        // console.log('cuisine', data)
        setCuisines(data.cuisineObjects)

        // set our X-axis scale. scaleBand() for our discrete X values.
        const xScale = d3
          .scaleBand()
          .domain(data.cuisineNames)
          .range([0, width])

        // set our Y-axis scale. Using 0 in the domain lets us show a more
        // significant block for our minimum value
        const yScale = d3
          .scaleLinear()
          .domain(d3.extent([...data.counts, 0]))
          .range([height, 0])
        setScales([xScale, yScale])

        // create and assign our axis labels
        const xAxis = d3.axisBottom()
        const yAxis = d3.axisLeft()
        console.log('props are:', props)
        xAxis.scale(xScale)
        d3.select(xAxisGroup.current).call(xAxis)
        yAxis.scale(yScale)
        d3.select(yAxisGroup.current).call(yAxis)

        d3
          .selectAll('.cuisineRect')
          .data([
            {height: height - yScale(data.cuisineObjects[0].count)},
            {height: height - yScale(data.cuisineObjects[1].count)},
            {height: height - yScale(data.cuisineObjects[2].count)},
            {height: height - yScale(data.cuisineObjects[3].count)},
            {height: height - yScale(data.cuisineObjects[4].count)}
          ])
          .transition()
          .duration(750)
          .attr('height', d => d.height)
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
          className="graph-item"
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g
            ref={xAxisGroup}
            transform={`translate(${margin.left}, ${height + margin.top})`}
          />
          <g
            ref={yAxisGroup}
            transform={`translate(${margin.left}, ${margin.top})`}
          />
          {cuisines.map((element, index) => {
            return (
              <g key={element._id}>
                <rect
                  className="cuisineRect"
                  data-scale={scales[1](element.count)} // returns difference from max; highest count item will return 0
                  x={index * scales[0].bandwidth() + margin.left + 1} // + 1 to show the y axis line
                  y={scales[1](element.count) + margin.top}
                  width={scales[0].bandwidth() - 10}
                  fill="#e3e769"
                />
              </g>
            )
          })}
        </svg>
      ) : (
        <Loader />
      )}
    </Fragment>
  )
}

export default CuisinesBarChart
