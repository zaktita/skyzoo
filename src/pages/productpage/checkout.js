import React, { useState } from 'react';
import './checkout.css';
import logo from '../../assets/logo.webp';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import Accordion from '../../components/accordion'
function Checkout() {
    const { cartItems, calculateTotal } = useShoppingCart();

    const [step, setStep] = useState(2);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <form onSubmit={handleNextStep}>
                            <h3>Your Details</h3>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Email" />
                            <button onClick={handleNextStep}>Next</button>
                        </form>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <form onSubmit={handleNextStep}>
                            <h3>Shipping Details</h3>
                            <div className="name-container">
                                <div>
                                    <label htmlFor="name">First Name</label>
                                    <input type="text" id="name" placeholder="Name" />
                                </div>
                                <div>
                                    <label htmlFor="surname">Last Name</label>
                                    <input type="text" id="surname" placeholder="Surname" />
                                </div>
                            </div>
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" placeholder="Phone" />
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" placeholder="Address" />
                            <div className="address-container">
                                <div>
                                    <label htmlFor="city">City</label>
                                    <input type="text" id="city" placeholder="City" />
                                </div>
                                <div>
                                    <label htmlFor="country">Country</label>
                                    <input type="text" id="country" placeholder="Country" />
                                </div>
                                <div>
                                    <label htmlFor="zip">Zip</label>
                                    <input type="number" id="zip" placeholder="Zip" />
                                </div>
                            </div>
                            <button className='backbtn' onClick={handlePrevStep}>Back</button>
                            <button onClick={handleNextStep}>Next</button>
                        </form>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <form >
                            <h3>Billing Options</h3>
                            {/* <Accordion title="payement with card"></Accordion>
                            <Accordion title="payement with Paypal"></Accordion>
                            <Accordion title="payement with cash on delivery"></Accordion> */}
                           <div>
                           <label htmlFor="card">payement with card</label>
                            <input type="radio" name="pay" id="card" />
                           </div>
                           <div>
                           <label htmlFor="Paypal">payement with Paypal</label>
                            <input type="radio" name="pay" id="Paypal" />
                           </div>
                           <div>
                           <label htmlFor="cash">payement with cash</label>
                            <input type="radio" name="pay" id="cash" />
                           </div>

                            <button  className='backbtn'onClick={handlePrevStep}>Back</button>
                            <button onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (<div className='checkout-container'>
        <div className='checkout-content'>

            <div className='checkout-header' >
                <img src={logo} alt="" style={{ width: '50px', height: '30px' }} />
                <h4>{cartItems.length} items  |  {calculateTotal(cartItems)} DH  </h4>
            </div>
            <div className='checkout-steps' >

                {renderStep()}</div>

                <div className='checkout-footer' >
                        <span className={step >= 1 ? 'active' : ''}>details</span>
                        <span className={step >= 2 ? 'active' : ''}>shipping</span>
                        <span className={step === 3 ? 'active' : ''}>details</span>
                </div>
        </div>
        <div className='upsale'>

        </div>
    </div>)
}

export default Checkout;
