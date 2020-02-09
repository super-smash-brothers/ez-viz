import React from 'react'
import {ComposableMap, Geographies, Geography} from 'react-simple-maps'

// url to a valid topojson file
const geoUrl = '/sandbox/NTA_T.json'

const NycSimpleMap = () => (
  <div style={{backgroundColor: '#000000'}}>
    <ComposableMap
      projectionConfig={{
        scale: 205,
        rotation: [-11, 0, 0]
      }}
      width={800}
      height={400}
      projection="geoAzimuthalEqualArea"
    >
      <Geographies geography={geoUrl}>
        {({geographies}) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
    </ComposableMap>
  </div>
)

export default NycSimpleMap
