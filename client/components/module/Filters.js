import React, {useState, useEffect, Fragment} from 'react'

const Filters = ({setFilter}) => {
  return (
    <div className="map-filters-container">
      <h3 className="block-title">What would you like to see?</h3>
      <form onChange={event => setFilter(event)}>
        <label>
          <select>
            <option value="">No filter</option>
            <option value="food">Food Safety</option>
            <option value="population">Population</option>
            <option value="noise">Noise Complaints</option>
            <option value="crime">Crime</option>
          </select>
        </label>
      </form>
    </div>
  )
}
export default Filters
