import React, { useState, useEffect } from 'react';
import './featured.css';
import productsData from "./products.json";
import Card from './card';
import { Menu } from './featuredMenu';
import axios from 'axios';
import { Link } from 'react-router-dom';




function Featured() {
  const [products, setproducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [results, setResults] = useState(0);
  useEffect(() => {
    fetchProductFromServer();
  }, []);
  const fetchProductFromServer = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category/New Arrivals ");
      setproducts(response.data.products);
      setCategoryName(response.data.category.category_name);
      setCategoryDescription(response.data.category.category_description);
      setResults(response.data.products.length)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='col-md featured'>
      <div className='featured-header'>
      <h2>New Arrivals</h2>
      <Link to='/category/New Arrivals'>See more</Link>
      </div>
      <div className='car-container'>
        {products.slice(0,8).map((product) => (
          <Card key={product.product_id} product={product} designclass='home-card' />
        ))}
      </div>
    </div>
  );
}

export default Featured;



