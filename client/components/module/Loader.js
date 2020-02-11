import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons'

const Loader = () => (
  <h2 className="loader">
    Loading&hellip;
    <br />
    <FontAwesomeIcon icon={faSyncAlt} size="lg" spin />
  </h2>
)

export default Loader
