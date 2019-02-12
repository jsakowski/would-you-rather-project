import React from 'react'
import Poll from './Poll'

const Category = (props) => {
  return (
      <ul className="list-unstyled">
        {props.items.map((id) => (
          <li key={id} className="pt-3">
            <Poll id={id}/>
          </li>
        ))}
      </ul>
  )
}

export default Category
