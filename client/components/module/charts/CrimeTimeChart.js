import React, {useEffect, useRef, useState, Fragment} from 'react'
import axios from 'axios'
import * as d3 from 'd3'
import Loader from '../Loader'

const CrimeTimeChart = props => {
  const [nta, setNTAState] = useState(props) // NTA Data
  const [crime, setCrime] = useState([[]]) // Cuisines
  const [scales, setScales] = useState([]) // Scales for rendering our chart
  const height = 260
  const width = 420
  const margin = {top: 40, bottom: 60, right: 40, left: 40}
  const xAxisGroup = useRef()
  const yAxisGroup = useRef()

  const parseDate = date => {
    //converts string to date object then date to month and day
    const parseTime = d3.timeParse('%Y-%m-%d')
    // const parseMonthDay = d3.timeFormat('%m-%d')
    return parseTime(date)
  }

  useEffect(
    () => {
      ;(async function getCrime() {
        const {data} = await axios.get(
          `/api/crimes/time/${props.ntaCode.NTACode}`
        )
        setCrime(data.crimeArr)
        const xScale = d3
          .scaleTime()
          .domain(
            d3.extent([
              ...data.dates.map(elem => {
                return parseDate(elem)
              })
            ])
          )
          .range([0, width])
        const yScale = d3
          .scaleLinear()
          .domain([0, d3.max(data.counts)])
          .range([height, 0])
        const lineScale = d3
          .line()
          .x(d => {
            return xScale(parseDate(d[0]))
          })
          .y(d => {
            return yScale(d[1])
          })
        setScales([xScale, yScale, lineScale])
        const xAxis = d3.axisBottom()
        const yAxis = d3.axisLeft()
        xAxis.scale(xScale)
        d3
          .select(xAxisGroup.current)
          .call(xAxis)
          .selectAll('text')
          .style('text-anchor', 'start')
          .attr('transform', 'rotate(25 10 10)')
        yAxis.scale(yScale)
        d3.select(yAxisGroup.current).call(yAxis)
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
          <g
            ref={xAxisGroup}
            transform={`translate(${margin.left}, ${height + margin.top})`}
          />
          <g
            ref={yAxisGroup}
            transform={`translate(${margin.left}, ${margin.top})`}
          />
          <path
            d={scales[2](crime)}
            strokeWidth={2}
            stroke="#eb6a5b"
            fill="none"
            transform={`translate(${margin.left}, ${margin.top})`}
          />
        </svg>
      ) : (
        <Loader />
      )}
    </Fragment>
  )
}

export default CrimeTimeChart
