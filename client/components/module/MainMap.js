import React, {Component} from 'react'
import NycMap from './NycMap'
// import NycSimpleMap from './NycSimpleMap'

export default class MainMapContainer extends Component {
  render = () => (
    <div className="main-map-container">
      <NycMap />
    </div>
  )
}
