import React, {Component} from 'react'
import MainMap from '../module/MainMap'
import MainMapFilters from '../module/MainMapFilters'

export default class Main extends Component {
  state = {
    filter: ''
  }

  // stage 2: extend to allow multiple filters?
  setFilter = filter => {
    this.setState({filter})
  }

  render = () => (
    <div className="main-page page-container flex">
      <MainMapFilters setFilter={this.setFilter} />
      <MainMap filter={this.state.filter} />
    </div>
  )
}
