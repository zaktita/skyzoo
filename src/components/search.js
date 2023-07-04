import React, { useEffect, useState } from 'react'
import Card from './card'
import productsData from "./products.json";
import './search.css'
import { CiSearch } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
function Search() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      setProducts(productsData);
    }, []);
  return (
    <div className='search-container'>
      <div className='search-bar'>
      
            <AiOutlineClose/>
      </div>
      <div className='search-results'>
        <div className='suggestions'>
            <h3>Trending searches</h3>
        <h4>sneakers</h4>
        <h4>heals</h4>
        <h4>bascket</h4>
        </div>
        <div className='results'>
        <h3>Results</h3>
        <div className='results-container'>

      {products.slice(0, 3).map((product) => (
          <Card key={product.id} product={product} designclass='search-card'/>
          ))}
          </div>
          <h3>See more</h3>
          </div>
      </div>
    </div>
  )
}

export default Search
