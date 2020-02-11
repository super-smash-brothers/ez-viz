import React from 'react'
import BarChart from './chartBar'

export const GraphContainer = props => {
  const {ntaCode} = props

  return (
    <div>
      <BarChart ntaCode={ntaCode} />
    </div>
  )
}
