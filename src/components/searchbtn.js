import React, { useEffect, useState } from 'react';
import './searchbtn.css'
import { CiSearch } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
// import productsData from "./products.json";
import Card from './card';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchModal = () => {
    const [products, setProducts] = useState([]);
    const [searchKeyWord, setsearchKeyWord] = useState('diam')
    // useEffect(() => {
    //     setProducts(productsData);
    // }, []);
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.keyCode === 27) {
                // Escape key
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };


    }, []);


    const handleSearch = (e) => {
        setsearchKeyWord(e.target.value)
        console.log(searchKeyWord);
    }

    const handleSubmit = async (e) => {
        console.log(searchKeyWord);
        // e.preventDefault()
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/search/${searchKeyWord}`);
            setProducts(response.data.products)
            console.log(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSubmit()
    }, [])

    return (
        <>
            <button
                data-toggle="modal"
                data-target="searchModal"
                onClick={toggleModal}
            >
                <CiSearch size={20}/>
            </button>

            {isOpen && (
                <div id="searchModal" className="modal active">
                    <div className="content">
                        <div className='search-bar'>
                            <div className='input-wrapper'>
                                <CiSearch />
                                <input type="search" name="search" id="search" placeholder='search' value={searchKeyWord} onChange={handleSearch} />
                                <button onClick={handleSubmit}>submit</button>
                            </div>
                            <button
                                data-dismiss="modal"
                                onClick={toggleModal}
                            >
                                <AiOutlineClose />

                            </button>
                        </div>
                        <div className="search-results">
                            <div className='suggestions'>
                                <h3>Trending searches</h3>
                                <p onClick={() => setsearchKeyWord('Product')}>
                                    <CiSearch />
                                    Product
                                </p>
                                <p onClick={() => setsearchKeyWord('heals')}>
                                    <CiSearch />
                                    heals
                                </p>
                                <p onClick={() => setsearchKeyWord('bascket')}>
                                    <CiSearch />
                                    bascket
                                </p>


                            </div>
                            <div className='results'>
                                <h3>Results</h3>
                                <div className='results-container'>

                                    {products.slice(0, 4).map((product, index) => (
                                        <Card key={index} product={product} designclass='search-card' />
                                    ))}
                                </div>
                                <a href={`/search/${searchKeyWord}`}>See more</a>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default SearchModal;
