import React, { useState,useEffect } from 'react'
import './categorie.css'
import {BsFilter} from 'react-icons/bs'
import Card  from '../components/card';
import productsData from "../components/products.json";
import Pagination from '../components/pagination';
import CategorieTitle from '../components/categorieTitle';

function Categorie() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      setProducts(productsData);
    }, []);
    const [results , setResults]= useState(100)
  return (
    <div className='col-md categorie'>
      <CategorieTitle title="Women's Sneakers" description=" Create a style statement season to season with our collection of women’s sneakers crafted to bring understated glamour to your off-duty wardrobe. "/>
    <div className='filters-bar'>
   <h4>
     {results} Products
    </h4>
        <div className='filters'>
            <h3>filters</h3>
            <BsFilter/>
        </div>

    </div>

    <div className='car-container'>
    {products.map((product) => (
        <Card key={product.id} product={product} designclass='featured-card'/>
          ))}
    </div>
    <Pagination/>
    </div>
  )
}

export default Categorie
