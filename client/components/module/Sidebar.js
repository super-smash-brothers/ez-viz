import React, {Component} from 'react'
import Filters from './Filters'

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

      <Filters setFilter={this.props.setFilter} />
    </div>
  )
}
