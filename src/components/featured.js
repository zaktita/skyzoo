import React,{ useState, useEffect } from 'react';
import './featured.css';
import productsData from "./products.json";
import Card  from './card';
import { Menu } from './featuredMenu';




function Featured() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div className='col-md featured'>
      <Menu />
      <div className='car-container'>

      {products.map((product) => (
          <Card key={product.id} product={product} designclass='home-card'/>
          ))}
          </div>
    </div>
  );
}

export default Featured;



