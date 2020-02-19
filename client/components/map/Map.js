import React, {Component} from 'react'
import Sidebar from '../module/Sidebar'
import {CityMap} from './MapCity'

const dummyFilters = ['population', 'restaurantGrades']

export default class Map extends Component {
  constructor() {
    super()
    this.state = {
      filter: '',
      filters: dummyFilters
    }
    this.setFilter = this.setFilter.bind(this)
  }

  // stage 2: extend to allow multiple filters?
  setFilter = event => {
    this.setState({filter: event.target.value})
  }

  render = () => (
    <div className="site-wrapper main-container">
      <div className="main-map-container">
        <CityMap filter={this.state.filter} />
      </div>
      {/* ZK: I removed a div here with the following classes:
       main-container
       main-page
       flex
       If sidebar stuff starts breaking, re-add */}
      <Sidebar
        filter={this.state.filter}
        filters={this.state.filters}
        setFilter={this.setFilter}
      />
    </div>
  )
}
