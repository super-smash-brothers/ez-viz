import React, {Component} from 'react'
import d3 from 'd3'
import {Map, TileLayer, SVGOverlay} from 'react-leaflet'
import {CityMap} from '../mapCity'

// We can't get this one to work. It may solve our problems, but it says we need to install d3??
// import * as rld3svg from 'react-leaflet-d3-svg-overlay'

// Set up our
const viewport = {
  center: [40.7058323382838, -73.9778016471983],
  zoom: 10
}

// select map style
const mapStyleId = 'mapbox/streets-v11'

// mapbox API access token
const accessToken =
  'pk.eyJ1Ijoiemthcm1pIiwiYSI6ImNrNjl0cjEyZjBqanUzZG41YmJqempsb2oifQ.rTF7bmNtao5ZSLkLN_1JWA'

// Mapbox/OpenstreetMap requires attribution
const mapAttribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

// API URL for map
const mapUrl = `https://api.mapbox.com/styles/v1/${mapStyleId}/tiles/{z}/{x}/{y}?access_token=${accessToken}`

// min/max bounds for our overlays
const bnd = [
  [40.9155410761847, -74.2555928790719],
  [40.4961236003829, -73.7000104153247]
]

export default class MainMapContainer extends Component {
  componentDidMount() {}

  render = () => (
    <Map
      className="main-map-container"
      id="map"
      center={viewport.center}
      zoom={viewport.zoom}
      ref={thisMap => {
        this.map = thisMap
      }}
    >
      <TileLayer attribution={mapAttribution} url={mapUrl} />
      {/* Another attempt to include an overlay, but this doesn't seem to have a way to set the viewBox or link the overlay to the map for zoom/pan */}
      <SVGOverlay viewBox="0 0 400 400" bounds={bnd} id="ovelay">
        <CityMap style={{backgroundColor: 'red'}} />
        {/* <rld3svg /> */}
      </SVGOverlay>
    </Map>
  )
}
