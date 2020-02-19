import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import GraphSelector from './GraphSelector'

const GraphContainer = props => {
  const {ntaCode, filter, clearBarData, grades} = props
  return (
    <div className="graph-container-mask">
      <div className="graph-container">
        <div
          className="graph-container__controls"
          onClick={() => clearBarData()}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" /> Return to Map
        </div>
        <GraphSelector grades={grades} ntaCode={ntaCode} filter={filter} />
      </div>
    </div>
  )
}

export default GraphContainer
