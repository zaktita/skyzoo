
import React,{useEffect } from 'react';
import './card.css'
 function Card(props) {
    const { product , designclass} = props;
    // const [imgSrc, setImgSrc] = React.useState(null);
  
// useEffect(() => {
//       async function importImage() {
//         const module = await import(`.http://localhost:8000/storage/${product.image}`);
//         setImgSrc(module.default);
//       }
//       importImage();
//     }, [product.img]);
  

    
    return (
      <div className={props.designclass}>
        <img src={`http://localhost:8000/storage/${product.image}`} alt={product.title} />
        <div className='card-info'>
        <h4>{product.title}</h4>
        <h3>{`${product.price} dh`}</h3>
        </div>
      </div>
    );
  }

  export default Card;