
import React from 'react';
import { Link } from 'react-router-dom';
import './card.css'
 function Card(props) {
    const { product , designclass} = props;


    return (
      <div className={props.designclass}>
        <Link to={`/product/${product.product_id}`}>
        <img src={`http://localhost:8000/storage/${product.image}`} alt={product.title} />
        </Link>
        <div className='card-info'>
        <Link to={`/product/${product.product_id}`}>
        <h4>{product.title}</h4>
        </Link>

        <h3>{`${product.price} dh`}</h3>
        </div>
      </div>
    );
  }

  export default Card;