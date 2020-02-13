import React, {useEffect} from 'react'
import * as d3 from 'd3'

export const FoodGradePieChart = props => {
  const grades = props.grades[0][1]
  const total = grades.A + grades.B + grades.C
  const frame = 200
  const ntaCode = props.ntaCode
  console.log('nta Code', ntaCode)
  const arcGenerator = d3.arc()
  const aSlice = arcGenerator({
    startAngle: 0,
    endAngle: 2 * Math.PI * grades.A / total,
    innerRadius: 0,
    outerRadius: frame / 2
  })
  const bSlice = arcGenerator({
    startAngle: 2 * Math.PI * grades.A / total,
    endAngle: 2 * Math.PI * (grades.B + grades.A) / total,
    innerRadius: 0,
    outerRadius: frame / 2
  })
  const cSlice = arcGenerator({
    startAngle: 2 * Math.PI * (grades.B + grades.A) / total,
    endAngle: 2 * Math.PI * (grades.C + grades.B + grades.A) / total,
    innerRadius: 0,
    outerRadius: frame / 2
  })

  return (
    <svg height={frame} width={frame}>
      <path
        d={cSlice}
        fill="red"
        transform={`translate(${frame / 2}, ${frame / 2})`}
      />
      <path
        d={bSlice}
        fill="yellow"
        transform={`translate(${frame / 2}, ${frame / 2})`}
      />
      <path
        d={aSlice}
        fill="green"
        transform={`translate(${frame / 2}, ${frame / 2})`}
      />
    </svg>
  )
}
