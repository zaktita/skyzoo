import React, { useEffect, useState } from 'react';
import './searchbtn.css'
import { CiSearch } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import productsData from "./products.json";
import Card from './card';

const SearchModal = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(productsData);
    }, []);
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

    return (
        <>
            <button
                data-toggle="modal"
                data-target="searchModal"
                onClick={toggleModal}
            >
                <CiSearch />
            </button>

            {isOpen && (
                <div id="searchModal" className="modal active">
                    <div className="content">
                        <div className='search-bar'>
                            <div className='input-wrapper'>
                                <CiSearch />
                                <input type="search" name="search" id="search" placeholder='search' />
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
                                <p><CiSearch />sneakers</p>
                                <p><CiSearch />heals</p>
                                <p><CiSearch />bascket</p>

                            </div>
                            <div className='results'>
                                <h3>Results</h3>
                                <div className='results-container'>

                                    {products.slice(0, 4).map((product) => (
                                        <Card key={product.id} product={product} designclass='search-card' />
                                    ))}
                                </div>
                                <h3>See more</h3>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default SearchModal;
