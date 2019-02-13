import React from 'react'
import PollSummary from './PollSummary'

const Category = (props) => {
  return (
      <ul className='list-unstyled'>
        {props.items.map((id) => (
          <li key={id} className='pt-3'>
            <PollSummary id={id} />
          </li>
        ))}
      </ul>
  )
}

export default Category
