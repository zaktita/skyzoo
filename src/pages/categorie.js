import React, { useState, useEffect } from 'react';
import Card from '../components/card';
import CategorieTitle from '../components/categorieTitle';
import axios from 'axios';
import './categorie.css';
import '../components/pagination.css';
import Filters from '../components/filters';
import { useParams } from 'react-router';


function Categorie() {
  // State variables
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [results, setResults] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { urlCategory } = useParams();
  const [filters, setFilters] = useState({
    filterCategory: urlCategory,
    filterColor: [],
    filterSize: [],
    minPrice: 0,
    maxPrice: 100000,
  })

  useEffect(() => {
    fetchProductFromServer();
  }, [filters]);



  // Fetch products from the server
  const fetchProductFromServer = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/category/${filters.filterCategory}`);
      setProducts(response.data.products);
      setCategoryName(response.data.category.category_name);
      setCategoryDescription(response.data.category.category_description);
      setResults(response.data.products.length);
console.log(response.data.products);
      if(filters.filterColor.length>0){
        setProducts(response.data.products.filter((product) => filters.filterColor.some((color) => product.colors.includes(color))))
      }
      if(filters.filterSize.length>0){
        setProducts(response.data.products.filter((product) => filters.filterSize.some((size) => product.sizes.includes(size))))
      }
      if(filters.minPrice >=0 || filters.maxPrice >0){
        setProducts(response.data.products.filter((product) => product.price >= filters.minPrice && product.price <= filters.maxPrice))
      }
        
      
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate the indexes of the current page's products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render pagination links
  const renderPagination = () => {
    const pageNumbers = Math.ceil(products.length / productsPerPage);

    // Generate the pagination links
    const paginationLinks = [];
    for (let i = 1; i <= pageNumbers; i++) {
      paginationLinks.push(
        <div key={i} className={i === currentPage ? 'active' : ''}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </div>
      );
    }




    return (
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {paginationLinks}
        <button
          disabled={currentPage === pageNumbers}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="col-md categorie">
      <CategorieTitle className="categoryHeader" title={categoryName} description={categoryDescription} />
      <div className="filters-bar">
        <h4>{results} Products</h4>
        <div className="filters">
          <h3>filters</h3>
          <Filters setApplyFilter={setFilters} initialCategory={urlCategory}/>

        </div>
      </div>

      <div className="car-container">
        {currentProducts.map((product) => (
          <Card key={product.product_id} product={product} designclass="home-card" />
        ))}
      </div>

      {renderPagination()}
    </div>
  );
}

export default Categorie;
