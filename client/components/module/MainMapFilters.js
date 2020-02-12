// BEING USED?

import React, {Component} from 'react'

export default class MainMapFilters extends Component {
  render = () => (
    <div className="map-filters">
      <h3 className="block-title">What would you like to see?</h3>
      <p className="filters-description">
        Delve.NYC is a visualizer for NYC data. Select a filter to view a
        choropleth of its values across New York City. Hover over a neighborhood
        to see it's name. Click the neighborhood for a detailed breakdown of
        statistics for that criteria.
      </p>
    </div>
  )
}
