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

const mapStyleId = 'mapbox/streets-v11'

const accessToken =
  'pk.eyJ1Ijoiemthcm1pIiwiYSI6ImNrNjl0cjEyZjBqanUzZG41YmJqempsb2oifQ.rTF7bmNtao5ZSLkLN_1JWA'

const mapAttribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

const mapUrl = `https://api.mapbox.com/styles/v1/${mapStyleId}/tiles/{z}/{x}/{y}?access_token=${accessToken}`

const bnd = [
  [40.9155410761847, -74.2555928790719],
  [40.4961236003829, -73.7000104153247]
]

export default class MainMapContainer extends Component {
  componentDidMount() {}

  makeSvgOverlay() {
    const svgLayer = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )
    const newLayer = new SVGOverlay(svgLayer, bnd)
    this.map.addLayer(newLayer)
  }

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
      <SVGOverlay bounds={bnd} id="ovelay">
        <CityMap style={{backgroundColor: 'red'}} />
        {/* <rld3svg /> */}
      </SVGOverlay>
    </Map>
  )
}
