import React from 'react'
import * as d3 from 'd3'
import {legendColor} from 'd3-svg-legend'

console.log('legendColor = ', legendColor)
console.log('popColorSCale = ', popColorScale)

const legendLinear = legendColor()
  .shapeWidth(30)
  .cells(10)
  .orient('hoizontal')
  .scale(popColorScale)

const legendBox = d3.select('.legendLinear').call(legendLinear)
console.log('legendLinear = ', legendLinear)

const Legend = ({scale}) => {}
