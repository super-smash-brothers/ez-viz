import React, {useState, useEffect} from 'react'
import {geoEqualEarth, geoPath} from 'd3-geo'
import {feature} from 'topojson-client'

const projection = geoEqualEarth()
  .scale(160)
  .translate([800 / 2, 450 / 2])

const NycMap = () => {
  const [geographies, setGeographies] = useState([])
  useEffect(() => {
    fetch('/sandbox/NTA_T.json').then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`)
        return
      }
      response.json().then(mapData => {
        // console.log(mapData.objects.NTA.geometries)
        console.log(feature(mapData, mapData.objects.NTA.features))
        // console.log(
        //   'checking mapData.objects: ',
        //   mapData.objects.NTA.geometries
        // )
        // setGeographies(feature(mapData, mapData, mapData.objects.NTA))
      })
    })
  }, [])
  return (
    <svg width={800} height={450} viewBox="0 0 800 450">
      <g className="counties">
        {geographies && console.log('geographies is: ', geographies)
        /*          geographies.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection)(d)}
              className="county"
              fill={`rgba(38,50,56, ${(1 / geographies.length) * i})`}
              stroke="#FFFFFF"
              strokeWidth={0.5}
            />
))*/
        }
      </g>
    </svg>
  )
}

export default NycMap
