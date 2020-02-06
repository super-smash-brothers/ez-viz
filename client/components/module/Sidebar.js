import React, {Component} from 'react'

export default class Sidebar extends Component {
  render = () => (
    <div className="sidebar">
      <header className="side-header">
        <div className="logo">
          <strong>
            Delve<span className="tld">.nyc</span>
          </strong>
        </div>
      </header>

      <div className="map-filters-container">
        <h3 className="block-title">Filter by&hellip;</h3>
        <ul className="map-filters">
          <li className="map-filter__item">
            <input
              type="checkbox"
              className="map-filter__item-checkbox"
              onClick={this.props.setFilter}
              name="blah"
            />
            A Map Filter
          </li>
          <li className="map-filter__item">
            <input type="checkbox" className="map-filter__item-checkbox" />A Map
            Filter
          </li>
          <li className="map-filter__item">
            <input type="checkbox" className="map-filter__item-checkbox" />A Map
            Filter
          </li>
          <li className="map-filter__item">
            <input type="checkbox" className="map-filter__item-checkbox" />A Map
            Filter
          </li>
          <li className="map-filter__item">
            <input type="checkbox" className="map-filter__item-checkbox" />A Map
            Filter
          </li>
        </ul>
      </div>
    </div>
  )
}
