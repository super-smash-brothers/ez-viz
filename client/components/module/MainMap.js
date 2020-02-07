import React, {Component} from 'react'
import d3 from 'd3'
import {Map, TileLayer, withLeaflet} from 'react-leaflet'
// import 'react-leaflet-d3-svg-overlay'

// console.log('d3svgoverlay:', D3SVGOverlay)

const viewport = {
  center: [40.7058323382838, -73.9778016471983],
  zoom: 10
}

const mapStyleId = 'mapbox/streets-v11'

const accessToken =
  'pk.eyJ1Ijoiemthcm1pIiwiYSI6ImNrNjl0cjEyZjBqanUzZG41YmJqempsb2oifQ.rTF7bmNtao5ZSLkLN_1JWA'

const mapAttribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

const mapUrl = `https://api.mapbox.com/styles/v1/${mapStyleId}/tiles/{z}/{x}/{y}?access_token=${accessToken}`

export default class MainMapContainer extends Component {
  componentDidMount() {}

  render = () => (
    <Map
      className="main-map-container"
      id="map"
      center={viewport.center}
      zoom={viewport.zoom}
    >
      <TileLayer attribution={mapAttribution} url={mapUrl} />
    </Map>
  )
}
