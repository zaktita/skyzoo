import React from 'react'

function CategorieTitle(props) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
      <h2
      style={{fontSize:'1.2rem'}}
      >{props.title}</h2>
      <h4
        style={{ display: 'inline-block', margin: '0 auto' , fontSize:'.8rem' , width:'80%', marginTop:'15px'}}
      >{props.description}</h4>
    </div>
  )
}

export default CategorieTitle
