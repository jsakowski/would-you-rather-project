import React from 'react'
import PropTypes from 'prop-types'
import PollContainer from './PollContainer'

const PollList = (props) => {
  const { items, homeTab } = props

  return (
    <ul className='list-unstyled'>
      {items.map((id) => (
        <li key={id} className='pt-3'>
          <PollContainer id={id} type='summary' isCancelButton={false} homeTab={homeTab} />
        </li>
      ))}
    </ul>
  )
}
PollList.propTypes = {
  items: PropTypes.array.isRequired,
  homeTab: PropTypes.string.isRequired
};

export default PollList
