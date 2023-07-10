import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import Card from './card';
import Accordion from './accordion';
import axios from 'axios';

// import './filters.css';

function Filters() {
    const [productColors, setProductColors] = useState([]);
    const [productSize, setProductSize] = useState([]);
    const [categories, setCategories] = useState([]);


    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [activeCategory, setActiveCategory] = useState(true);


    const [filterColor, setFilterColor] = useState([]);
    const [filterSize, setFilterSize] = useState([]);
    const [filterCategory, setFilterCategory] = useState();
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        fetchProductFilters();

    }, []);

    // Fetch product filters from the server
    const fetchProductFilters = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/filters");

            setProductSize(response.data.sizes);
            setProductColors(response.data.colors);
            setCategories(response.data.category);

            console.log(response.data.category);
        } catch (error) {
            console.log(error);
        }
    };

    // Toggle the filters modal
    const toggleModal = () => {
        setIsOpen(!isOpen);
        document.body.classList.toggle('cart-modal-open');
    };


    // Handle category change
    const handleColorChange = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        const itsinarray = filterColor.some(item => item === value);
        if (!checked && itsinarray) {
            setFilterColor(filterColor.filter(item => item !== value))
            e.currentTarget.nextElementSibling.style.boxShadow = `none`
        }
        else if (checked && !itsinarray) {
            setFilterColor([...filterColor, value]);
            e.currentTarget.nextElementSibling.style.boxShadow = `0 0 0 2px white , 0 0 0 3px ${value}`
        }

    };




    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setFilterCategory(category.category_name)
        console.log(category.category_name);
    };


    const handleSizeChange = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        const itsinarray = filterSize.some(item => item === value);

        if (!checked && itsinarray) {
            setFilterSize(filterSize.filter(item => item !== value))
            e.currentTarget.parentElement.style.backgroundColor = `white`
            e.currentTarget.parentElement.style.color = `var(--maincolor)`
        }
        else if (checked && !itsinarray) {
            setFilterSize([...filterSize, value]);
            e.currentTarget.parentElement.style.backgroundColor = 'var(--maincolor)'
            e.currentTarget.parentElement.style.color = `white`
        }
    };


    useEffect(() => {
        console.log(productSize);
    }, [productSize])

    // Handle applying filters
    const handleApplyFilters = () => {
        // TODO: Handle apply filters logic
        console.log('Apply filters clicked');
        console.log('Selected category:', categories);
        console.log('Min price:', minPrice);
        console.log('Max price:', maxPrice);
    };

    return (
        <div>
            <button data-toggle="cartmodal" data-target="cartmodal" onClick={toggleModal}>
                <BsFilter />
            </button>

            {isOpen && (
                <div id="cartmodal" className="cartmodal active" style={{ overflowY: 'scroll' }}>
                    <div className="cartcontent" style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',

                    }}>
                        <div className="cartbody">
                            <div className="cartheader" style={{ marginBottom: '10px' }}>
                                <button style={{ border: '1px solid #000', padding: '5px 15px' }}>Clear All</button>
                                <button data-dismiss="cartmodal" onClick={toggleModal}>
                                    <AiOutlineClose />
                                </button>
                            </div>
                            <Accordion title="Category">
                                <div>
                                    {categories.map((category, index, e) => (
                                        <div key={index}

                                            style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '5px 0' }}>
                                            <input
                                                checked={category === activeCategory} // Assuming you have an activeCategory state to track the active category
                                                style={{
                                                    appearance: 'none',
                                                    width: '20px',
                                                    height: '20px',
                                                    cursor: 'pointer',
                                                    border: '2px solid var(--maincolor)',
                                                    backgroundColor: category === activeCategory ? 'var(--black)' : 'var(--white)',
                                                    borderRadius: '5px',
                                                }}
                                                type="radio"
                                                name="category"
                                                id={`category-${index}`}
                                                onChange={() => handleCategoryChange(category, e)} // Passing the category as an argument to the handler
                                            />
                                            <label htmlFor={`category-${index}`}>{category.category_name}</label>
                                        </div>
                                    ))}
                                </div>

                            </Accordion>
                            <Accordion title="Price">
                                <div>
                                    <input
                                        style={{
                                            color: 'var(--black)',
                                            border: '1px solid var(--maincolor)',
                                            margin: '5px 0',
                                            padding: '5px',
                                        }}
                                        type="text" name="minPrice" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                    <input
                                        style={{
                                            color: 'var(--black)',
                                            border: '1px solid var(--maincolor)',
                                            margin: '5px 0',
                                            padding: '5px',
                                        }}
                                        type="text" name="maxPrice" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                </div>
                            </Accordion>
                            <Accordion title="Color">
                                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', listStyle: 'none' }}>
                                    {productColors.map((color, index) => (
                                        <li key={index} style={{ width: '40%', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <div
                                                className='color-box'
                                                style={{ backgroundColor: color.color_name, width: '20px', position: 'relative' }}
                                            >
                                                <input
                                                    onChange={handleColorChange}
                                                    type="checkbox"
                                                    name="color"
                                                    id={index}
                                                    value={color.color_name}
                                                    style={{ visibility: 'hidden' }}
                                                />
                                                <label htmlFor={index} style={{ width: '20px', height: '100%', position: 'absolute', right: '0', top: '0' }}></label>
                                            </div>
                                            <h3 key={index}>{color.color_name}</h3>
                                        </li>
                                    ))}
                                </ul>
                            </Accordion>
                            <Accordion title="Size">
                                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', listStyle: 'none', color: 'var(--maincolor)' }}>
                                    {productSize.map((size, index) => (

                                        <li
                                            key={size.id}
                                            className='size-box'
                                            style={{ display: 'flex', border: '1px solid', alignItems: 'center', padding: '15px', position: 'relative' }}
                                        >
                                            <input
                                                type="checkbox"
                                                name="size"
                                                id={`size_${index}`}
                                                value={size.size}
                                                style={{ visibility: 'hidden', position: 'absolute', inset: 'auto' }}
                                                onChange={handleSizeChange}
                                            />
                                            <label htmlFor={`size_${index}`} style={{ cursor: 'pointer' }} >{size.size}</label>
                                        </li>

                                    ))}
                                </ul>
                            </Accordion>
                        </div>

                        <div className="cartfooter">
                            <button
                                style={{ backgroundColor: 'var(--maincolor)', color: 'white', width: '100%', padding: '15px' }}
                                onClick={handleApplyFilters}
                            >
                                Apply filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Filters;
