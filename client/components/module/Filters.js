import React, {useState, useEffect, Fragment} from 'react'

const Filters = ({setFilter}) => {
  // const [selected, select] = useState('food')
  // console.log('selected: ', selected)
  console.log('is set filter here?', setFilter)
  return (
    <div className="map-filters-container">
      <h3 className="block-title">What would you like to see?</h3>
      <form onChange={event => setFilter(event)}>
        <label>
          <select>
            <option value="food">Restaurants</option>
            <option value="population">Population</option>
            <option value="noise">Noise</option>
            <option value="crime">Crime</option>
          </select>
        </label>
      </form>
    </div>
  )
}
export default Filters
