/* eslint-disable indent react/jsx-indent react/jsx-indent-props */
import React from 'react'
import polylabel from 'polylabel'

const Tooltip = ({nta, xScale, yScale}) => {
  console.log('this neighborhood is:', nta)

  const pOI = polylabel(nta.geometry.coordinates, 1.0)

  console.log(
    `its pole of inaccessibility is:, ${xScale(pOI[0])}, ${yScale(pOI[1])}`
  )

  return (
    <g className="nta-tooltip">
      <rect
        x={xScale(pOI[0])}
        y={yScale(pOI[1])}
        width={20}
        height={20}
        style={{backgroundColor: 'black'}}
      />
      <text>{nta.properties.NTAName}</text>
    </g>
  )
}

export default Tooltip

/* eslint-disable indent */

// Get bounding box of SVG
// on mouseover NTA
// Edge Cases:
// is ( Tooltip.center.x + (Tooltip.width / 2) ) > (svg.left + width)?
// Yes:
// Tooltip.left = Tooltip.center.x - Tooltip.width / 2? // i.e., move
// it over so full width is to the left?
// No:
// is ( Tooltip.center.x - (Tooltip.width / 2) <  (svg.left)?
// Yes:
// Tooltip.left = Tooltip.center.x
// is ( Tooltip.center.y < Tooltip.height)?
// Yes:
// Move Tooltip.y down to (Tooltip.y + Tooltip.height + 10)
// No:
