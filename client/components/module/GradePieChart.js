import React from 'react'
import * as d3 from 'd3'

export const FoodGradePieChart = props => {
  const grades = {
    A: 326,
    B: 117,
    C: 745,
    total: 1188
  }
  const frame = 200
  const arcGenerator = d3.arc()
  const aSlice = arcGenerator({
    startAngle: 0,
    endAngle: 2 * Math.PI * grades.A / grades.total,
    innerRadius: 0,
    outerRadius: frame / 2
  })
  const bSlice = arcGenerator({
    startAngle: 2 * Math.PI * grades.A / grades.total,
    endAngle: 2 * Math.PI * (grades.B + grades.A) / grades.total,
    innerRadius: 0,
    outerRadius: frame / 2
  })
  const cSlice = arcGenerator({
    startAngle: 2 * Math.PI * (grades.B + grades.A) / grades.total,
    endAngle: 2 * Math.PI * (grades.C + grades.B + grades.A) / grades.total,
    innerRadius: 0,
    outerRadius: frame / 2
  })
  return (
    <svg height={frame} width={frame}>
      <path
        d={cSlice}
        fill="green"
        transform={`translate(${frame / 2}, ${frame / 2})`}
      />
      <path
        d={bSlice}
        fill="red"
        transform={`translate(${frame / 2}, ${frame / 2})`}
      />
      <path
        d={aSlice}
        fill="blue"
        transform={`translate(${frame / 2}, ${frame / 2})`}
      />
    </svg>
  )
}
