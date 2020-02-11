import React, {useEffect, useRef, useState, Fragment} from 'react'
import axios from 'axios'
import * as d3 from 'd3'
import Loader from './Loader'

const CuisinesBarChart = props => {
  // Create our State vars
  const [nta, setNTAState] = useState(props) // NTA Data
  const [cuisines, setCuisines] = useState([]) // Cuisines
  const [scales, setScales] = useState([]) // Scales for rendering our chart

  // Chart dimensions
  const height = 260
  const width = 500
  const margin = {top: 20, bottom: 20, right: 50, left: 40}

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
        // get our data and put it on state
        const {data} = await axios.get('/api/restaurants/cuisine/MN17')
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
          .range([height, margin.bottom])
        setScales([xScale, yScale])

        // create and assign our axis labels
        const xAxis = d3.axisBottom()
        const yAxis = d3.axisLeft()
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
          width={width + margin.right}
          height={height}
          className="graph-item"
        >
          <g
            ref={xAxisGroup}
            transform={`translate(${margin.left}, ${height - margin.bottom})`}
          />
          <g
            ref={yAxisGroup}
            transform={`translate(${margin.left}, -${margin.bottom})`}
          />
          {cuisines.map((element, index) => {
            return (
              <g key={element._id}>
                <rect
                  data-scale={scales[1](element.count)}
                  x={index * scales[0].bandwidth() + margin.left + 1}
                  y={scales[1](element.count) - margin.bottom}
                  width={scales[0].bandwidth() - 10}
                  height={height - scales[1](element.count)}
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
