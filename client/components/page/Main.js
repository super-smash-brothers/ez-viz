import React, {Component} from 'react'
import MainMap from '../module/MainMap'
import MainMapFilters from '../module/MainMapFilters'
import Sidebar from '../module/Sidebar'

const dummyFilters = ['population', 'restaurantGrades']

export default class Main extends Component {
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
      <MainMap filter={this.state.filter} />
      {/* ZK: I removed main-container here. If sidebar stuff starts breaking, re0add*/}
      <div className="main-page flex">
        <Sidebar
          filter={this.state.filter}
          filters={this.state.filters}
          setFilter={this.setFilter}
        />
      </div>
    </div>
  )
}
