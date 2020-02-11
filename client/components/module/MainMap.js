import React, {Component} from 'react'
import {CityMap} from '../mapCity'

// import NycMap from './NycMap' // map rendering using npm modules d3-geo and topojson-client
// import NycSimpleMap from './NycSimpleMap' // map rendering using npm module react-simple-maps

import CuisinesBarChart from '../module/CuisinesBarChart'
import {LineChart} from '../chartLine'

export default class MainMapContainer extends Component {
  componentDidMount() {}

  render = () => (
    <div className="main-map-container">
      <h1>Inside MainMap component</h1>
      <h1>CityMap component</h1>
      <CityMap />
      {/* <h1>NycMap component</h1>
      <NycMap /> */}
      {/* <h1>NycSimpleMap component</h1>
      <NycSimpleMap /> */}
      <h1>CuisinesBarChart component</h1>
      <CuisinesBarChart />
      <h1>LineChart component</h1>
      <LineChart />
    </div>
  )
}
