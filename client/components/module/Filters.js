import React, {useState, useEffect, Fragment} from 'react'

const Filters = ({setFilter}) => {
  return (
    <div className="map-filters-container">
      <h3 className="block-title">What would you like to see?</h3>
      <form onChange={event => setFilter(event)}>
        <label>
          <select className="map-filter-input">
            <option value="">No filter</option>
            <option value="food">Restaurants</option>
            <option value="population">Population</option>
            <option value="noise">Noise</option>
            <option value="crime">Crime</option>
          </select>
        </label>
      </form>
      <p className="map-filters-description">
        Delve.NYC is a visualizer for NYC data. <br />
        Select a filter to view a choropleth of its values across New York City.{' '}
        <br />
        Hover over a neighborhood to see it's name. <br />
        Click the neighborhood for a detailed breakdown of statistics for that
        criteria.
      </p>
    </div>
  )
}
export default Filters
