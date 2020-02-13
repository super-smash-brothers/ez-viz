import React from 'react'
import Legend from './Legend'

const Filters = ({setFilter, filter}) => {
  return (
    <div className="map-filters-container">
      <h3 className="block-title">What would you like to see?</h3>
      <form onChange={event => setFilter(event)}>
        <label>
          <select className="map-filter-input">
            <option value="">No filter</option>
            <option value="food">Food Safety</option>
            <option value="population">Population</option>
            <option value="noise">Noise Complaints</option>
            <option value="crime">Crime</option>
            <option value="comprehensive">Comprehensive View</option>
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
      {!!filter.length && <Legend filter={filter} />}
    </div>
  )
}
export default Filters
