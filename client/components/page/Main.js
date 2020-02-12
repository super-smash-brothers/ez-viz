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
    console.log('set event:', event.target.value)
    this.setState({filter: event.target.value})
  }

  render = () => (
    <>
      <MainMap filter={this.state.filter} />
      <div className="main-page main-container flex">
        <Sidebar
          filter={this.state.filter}
          filters={this.state.filters}
          setFilter={this.setFilter}
        />
      </div>
    </>
  )
}
