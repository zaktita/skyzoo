import React from 'react'

function CategorieTitle(props) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2>{props.title}</h2>
      <h4>{props.description}</h4>
    </div>
  )
}

export default CategorieTitle
