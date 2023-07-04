import React from 'react'
import Button from './button'
function CategorieCard(props) {
  return (
    <div className={props.sectionType}>
        <span>
        <h3>{props.title}</h3>
        <h4>{props.description}</h4>
      </span>
      <Button btnClass='secondBtn'/>
    </div>
  )
}

export default CategorieCard
