import React, { useEffect, useState } from 'react'
import './product.css'
import Card from '../../components/card';
import Addtocart from '../../components/addtocart';
import Accordion from '../../components/accordion';
import Carousel from './mobileSlider';
import { useParams } from 'react-router';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { Link } from 'react-router-dom';
import axiosClient from './axios_client';

function Product() {
  // const isMobile = window.innerWidth <= 500;



  // function to handle the screen resize so it can switch to the slider automatically when decreasing 
  // the screen size


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const [isLoading, setIsLoading] = useState(false); // Initialize the isLoading state
  const [quantity, setQuantity] = useState(1);

  const [productImages, setproductImages] = useState([]);
  const [productTile, setProductTile] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productSize, setProductSize] = useState([]);
  const [productColors, setProductColors] = useState([]);

  const [productCategory, setProductCategory] = useState();
  const [selectedProductSize, setSelectedProductSize] = useState(productSize[0]);
  const [selectedProductColor, setSelectedProductColor] = useState(productColors[0]);
  const [categoryName, setcategoryName] = useState();
  const [similarProducts, setSimilarProducts] = useState([]);
  const { product_id } = useParams()

  const [index, setIndex] = useState(0);
  const [error, setError] = useState("")
  const { cartItems,
    updatecartItems } = useShoppingCart();
  useEffect(() => {
    const execFetch = async () => {
      await fetchProductFromServer();
      console.log('Product colors', selectedProductSize)
      setSelectedProductSize(productSize[0]);
      setSelectedProductColor(productColors[0]);
    }
    execFetch();
    console.log(selectedProductSize)
  }, [product_id]);

  const fetchProductFromServer = async () => {
    try {
      const response = await axiosClient.get(`/products/${product_id}`);
      setproductImages(response.data.productImages)
      console.log(productImages);
      setProductTile(response.data.product.title)
      setProductDescription(response.data.product.description)
      setProductPrice(response.data.product.price)
      setProductCategory(response.data.product.category_id[0])
      setProductSize(response.data.product.sizes)
      setProductColors(response.data.product.colors)
      setSimilarProducts(response.data.similarProducts);
      console.log('similar', similarProducts);
      setcategoryName(response.data.category.category_name);
    } catch (error) {
      console.log(error);
    }
  };



  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handleColorChange = (e, index, color) => {
    const selectedColor = productColors[index];
    const labels = document.querySelectorAll('.color-box label');
    labels.forEach(label => {
      label.style.boxShadow = 'none';
    });
    e.currentTarget.nextElementSibling.style.boxShadow = `0 0 0 2px white , 0 0 0 3px ${color}`
    setSelectedProductColor(selectedColor);
  };


  const handleSizeChange = (e) => {
    setSelectedProductSize(e.target.value)
    // console.log(selectedProductSize);
  }

  const handleAddedProduct = () => {
    if (!selectedProductSize || !selectedProductColor) {
      setError("Please select a size and color");
      return;
    }
    setError(null)
    function generateRandomItemId() {
      return Math.floor(Math.random() * 100000); // Adjust the range as needed
    }

    const product = {
      item_id: generateRandomItemId(),
      title: productTile,
      description: productDescription,
      price: +productPrice,
      category_id: productCategory,
      size: selectedProductSize,
      color: selectedProductColor,
      image: productImages[0],
      quantity: quantity,
      totalPrice: productPrice * quantity,
      product_id: +product_id,
    }
    if (!cartItems.length > 1) {
      updatecartItems([product])
    } else { updatecartItems([...cartItems, product]) }
  }

  useEffect(() => {
    // console.log(cartItems.totalPrice);
  }
    , [cartItems])



  return (
    <div className='col-md product-page'>
      <div className='product'>
        <div className="left">
          {isMobile ? (
            <Carousel images={productImages} />
          ) : (
            productImages.map((image, index) => (
              <img
                key={index}
                src={image.filename}
                alt={`Product Image ${index + 1}`}
                style={{ width: '100%' }}
              />
            ))

          )
          }
        </div>
        <div className='right'>
          <h1>{productTile}</h1>
          <h3>{productDescription}</h3>
          <h2>{productPrice} dh</h2>
          {error ? <h4 style={{ color: 'red' }}>{error}</h4> : null}

          <select name="sizes" id="sizes" required onChange={(e) => handleSizeChange(e)}>
            {productSize.sort().map((size, index) => (
              <option key={index} value={size}>{size}</option>
            ))
            }
          </select>



          {/* <div style={{ display: 'flex', gap: '10px' }}>
            {productColors.map((color, index) => (
              <div
                key={index}
                className='color-box'
                style={{ backgroundColor: color, width: "20px", position: 'relative' }}
              >
                <input
                  type="radio"
                  name="color"
                  required
                  id={index}
                  style={{ visibility: 'hidden' }}
                  onClick={(e) => {
                    handleColorChange(e, index, color);
                  }}

                />
                <label
                  htmlFor={index}
                  style={{ width: '100%', height: '100%', position: 'absolute', right: '0', top: '0' }}
                ></label>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', width: '100px', justifyContent: 'space-between', border: '1px solid black' }}>

            <button onClick={handleDecrement} style={{ padding: '5px 10px', borderRight: '1px solid black' }}>-</button>
            <span style={{ padding: '5px 10px', }}>{quantity}</span>
            <button onClick={handleIncrement} style={{ padding: '5px 10px', borderLeft: '1px solid black' }}>+</button>
          </div> */}


          {/* display the color beside the increment button on mobile */}
          {isMobile ? (
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                {productColors.map((color, index) => (
                  <div
                    key={index}
                    className='color-box'
                    style={{ backgroundColor: color, width: "30px", position: 'relative' }}
                  >
                    <input
                      type="radio"
                      name="color"
                      required
                      id={index}
                      style={{ visibility: 'hidden' }}
                      onClick={(e) => {
                        handleColorChange(e, index, color);
                      }}
                    />
                    <label
                      htmlFor={index}
                      style={{ width: '100%', height: '100%', position: 'absolute', right: '0', top: '0' }}
                    ></label>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', width: '100px', justifyContent: 'space-between', border: '1px solid black' }}>
                <button onClick={handleDecrement} style={{ padding: '5px 10px', borderRight: '1px solid black' }}>-</button>
                <span style={{ padding: '5px 10px', }}>{quantity}</span>
                <button onClick={handleIncrement} style={{ padding: '5px 10px', borderLeft: '1px solid black' }}>+</button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {productColors.map((color, index) => (
                  <div
                    key={index}
                    className='color-box'
                    style={{ backgroundColor: color, width: "30px", height: '30px', position: 'relative' }}
                  >
                    <input
                      type="radio"
                      name="color"
                      required
                      id={index}
                      style={{ visibility: 'hidden' }}
                      onClick={(e) => {
                        handleColorChange(e, index, color);
                      }}
                    />
                    <label
                      htmlFor={index}
                      style={{ width: '100%', height: '100%', position: 'absolute', right: '0', top: '0' }}
                    ></label>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', width: '100px', justifyContent: 'space-between', border: '1px solid black' }}>
                <button onClick={handleDecrement} style={{ padding: '5px 10px', borderRight: '1px solid black' }}>-</button>
                <span style={{ padding: '5px 10px', }}>{quantity}</span>
                <button onClick={handleIncrement} style={{ padding: '5px 10px', borderLeft: '1px solid black' }}>+</button>
              </div>
            </>
          )}


          <Addtocart btnClass={isLoading ? 'loading' : 'mainBtn'} click={handleAddedProduct} />


          <div>
            <Accordion title="Details, care & fit">
              <p>
                Our Diamond Light Maxi has evolved from the signature Diamond Light trainer. Crafted with a responsible nappa leather upper, they’re shaped with a round toe and rest on a unique platform sole that resembles diamonds set in stone, elevating the trainer to give extra height. In classic white, they offer a bold yet understated look for off-duty days.
              </p>
              <ul>
                <li>Responsible nappa leather</li>
                <li>Lace-up style</li>
                <li>Multifaceted rubber sole with flecked finish
                  Round toe</li>
                <li>Leather back panel</li>
                <li>Platform measures: 3cm at front, 4.5cm at back
                </li>
                <li>By purchasing this product, you are supporting sustainable leather manufacturing through the Leather Working Group</li>
              </ul>
            </Accordion>
            <Accordion title="Delevery & return">
              <p>TEurope €0.00 (1-4 working days)
                Europe Next Day €20.00 (next day)
                International €0.00 (2-5 working days)
                Ground Shipping €0.00 (3-5 working days)

                Please note; the above delivery times exclude pre-orders and made-to-order items.

                Shop with confidence with free returns.</p>
            </Accordion>
            <Accordion title="Contact us"></Accordion>
          </div>
        </div>

      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Vous pouvez aimer</h3>
        <Link to={`/category/${categoryName}`} >See more</Link>

      </div>
      <div className='you-may-like'>
        {similarProducts
          .slice(0, isMobile ? 3 : undefined)
          .map((product) => (
            <Card key={product.product_id} product={product} designclass="home-card" />
          ))}
      </div>


    </div>
  )
}

export default Product

