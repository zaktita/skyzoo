import React, { useEffect, useState } from 'react'

import { AiOutlineClose } from 'react-icons/ai';
import productsData from "./products.json";
import './cart.css'
import Button from './button'
import Card from './card';
import CartItems from './cartItems';
import { BsFilter } from 'react-icons/bs';
import Accordion from './accordion';
import axios from 'axios';

function Filters() {
    const [products, setProducts] = useState([]);
    const [productColors, setProductColors] = useState([]);
    const [productSize, setProductSize] = useState([]);


    useEffect(() => {
        fetchProductFromServer();
    }, []);
    const fetchProductFromServer = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/filters");
            //   setproductImages(response.data.productImages)
            //   setProductTile(response.data.product.title)
            //   setProductDescription(response.data.product.description)
            //   setProductPrice(response.data.product.price)
            //   setProductCategory(response.data.product.category_id[0])
            setProductSize(response.data.sizes)
            setProductColors(response.data.colors)
            //   setSimilarProducts(response.data.similarProducts);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const [isOpen, setIsOpen] = useState(true);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        document.body.classList.toggle('cart-modal-open');
    };

    const handleSizeChange = (e) => {
        // setSelectedProductSize(e.target.value)
        // console.log(selectedProductSize);
    }

    const handleColorChange = (e, index, color) => {
        const selectedColor = productColors[index];
        // const labels = document.querySelectorAll('.color-box label');
        // labels.forEach(label => {
        //     label.style.boxShadow = 'none';
        // });
        e.currentTarget.nextElementSibling.style.boxShadow = `0 0 0 2px white , 0 0 0 3px ${color.color_name}`
        // setSelectedProductColor(selectedColor);
    };
    return (
        <div>
            <button
                data-toggle="cartmodal"
                data-target="cartmodal"
                onClick={toggleModal}
            >
                <BsFilter />
            </button>

            {isOpen && (
                <div id="cartmodal" className="cartmodal active" >
                    <div className="cartcontent" style={{ width: '100%' }} >
                        <div className='cartheader' style={{ marginBottom: '10px' }}>
                            <button style={{ border: ' 1px solid #000', padding: '5px 15px' }}>Clear All</button>
                            <button
                                data-dismiss="cartmodal"
                                onClick={toggleModal}
                            >
                                <AiOutlineClose />
                            </button>
                        </div>
                        <div className='cartbody'>

                            <Accordion title="Category" >
                                <div >
                                    <input type="checkbox" name="category" id="category" />
                                    <label htmlFor="category">Low top</label>
                                </div>
                            </Accordion>
                            <Accordion title="Price" >
                                <div >
                                    <input type="range" name="price" id="price" />
                                    <label htmlFor="price">Low top</label>
                                </div>
                            </Accordion>
                            <Accordion title="Color" >
                                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', listStyle: 'none' }}>
                                    {productColors.map((color, index) => (
                                        <li key={color.id} style={{width:'40%', display:'flex', alignItems:'center' , gap:'20px'}}>
                                            <div
                                                
                                                className='color-box'
                                                style={{ backgroundColor: color.color_name, width: "20px", position: 'relative' }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="color"
                                                    id={index}
                                                    style={{ visibility: 'hidden' }}
                                                    onClick={(e) => {
                                                        handleColorChange(e, index, color);
                                                    }}
                                                />

                                                <label
                                                    htmlFor={index}
                                                    style={{ width: '20px', height: '100%', position: 'absolute', right: '0', top: '0' }}
                                                ></label>
                                            </div>
                                            <h3 key={index}>{color.color_name}</h3>
                                        </li>
                                    ))}
                                </ul>
                            </Accordion>
                            <Accordion title="Size" >
                                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', width: '100%' }}>
                                    {productSize.sort().map((size, index) => (
                                        <button key={size.id+index} style={{ border: ' 1px solid grey', color: 'grey', padding: '15px 20px' }}>{size.size}</button>
                                    ))
                                    }
                                </div>
                            </Accordion>
                        </div>

                        <div className='cartfooter'>
                            <button style={{ backgroundColor: 'grey', color: 'white', width: '100%', padding: '5px 10px' }}>Apply filters</button>
                        </div>

                    </div>

                </div>

            )}
        </div>
    )
}

export default Filters
