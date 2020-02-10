import React from 'react'

const Filters = ({setFilter}) => {
  return (
    <div className="map-filters-container">
      <h3 className="block-title">Filter by&hellip;</h3>
      <ul className="map-filters">
        <li className="map-filter__item">
          <label>
            <input
              type="checkbox"
              className="map-filter__item-checkbox"
              onClick={setFilter}
              name="blah"
            />
            A Map Filter
          </label>
        </li>
        <li className="map-filter__item">
          <label>
            <input type="checkbox" className="map-filter__item-checkbox" />A Map
            Filter
          </label>
        </li>
        <li className="map-filter__item">
          <label>
            <input type="checkbox" className="map-filter__item-checkbox" />A Map
            Filter
          </label>
        </li>
        <li className="map-filter__item">
          <label>
            <input type="checkbox" className="map-filter__item-checkbox" />A Map
            Filter
          </label>
        </li>
        <li className="map-filter__item">
          <label>
            <input type="checkbox" className="map-filter__item-checkbox" />A Map
            Filter
          </label>
        </li>
      </ul>
    </div>
  )
}
export default Filters
