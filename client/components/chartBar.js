import React, {useState, useEffect} from 'react'
import {default as barChartData} from '../../public/barChartData.json'
import axios from 'axios'
// public/barChartData.js

export function BarChart(props) {
  const {height, width} = props
  const [grades, setGrades] = useState([])
  useEffect(() => {
    async function fetchGrades() {
      const calledGrades = await axios.get(`/api/neighborhoods/barchart`)
      console.log('called grades: ', calledGrades)
      setGrades(calledGrades.data)
    }
    fetchGrades()
  }, [])
  // if (grades.length) {
  //   grades.data.map(grade => {

  //   })
  // }

  return (
    <svg width={width} height={height}>
      {/* {this.state.map((temp, index) => {
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
      })} */}
    </svg>
  )
}
