import React, {Component} from 'react'
import {CityMap} from '../mapCity'

// import NycMap from './NycMap' // map rendering using npm modules d3-geo and topojson-client
// import NycSimpleMap from './NycSimpleMap' // map rendering using npm module react-simple-maps

// Cleanup?
import CuisinesBarChart from '../module/CuisinesBarChart'
import {LineChart} from '../chartLine'

// Cleanup?
// Does this _need_ to be a class component?

export default class MainMapContainer extends Component {
  render = () => (
    <div className="main-map-container">
      <CityMap filter={this.props.filter} />
    </div>
  )
}
