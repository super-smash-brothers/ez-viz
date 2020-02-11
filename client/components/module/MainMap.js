import React, {Component} from 'react'
import {CityMap} from '../mapCity'

// import NycMap from './NycMap' // map rendering using npm modules d3-geo and topojson-client
// import NycSimpleMap from './NycSimpleMap' // map rendering using npm module react-simple-maps

import BarChart from '../chartBar'
import {LineChart} from '../chartLine'

export default class MainMapContainer extends Component {
  constructor() {
    super()
  }

  render = () => (
    <div className="main-map-container">
      <h1>Inside MainMap component</h1>
      <h1>CityMap component</h1>
      <CityMap filter={this.props.filter} />
      {/* <h1>NycMap component</h1>
      <NycMap /> */}
      {/* <h1>NycSimpleMap component</h1>
      <NycSimpleMap /> */}
      {/* <h1>BarChart component</h1>
      <BarChart />
      <h1>LineChart component</h1>
      <LineChart /> */}
    </div>
  )
}
