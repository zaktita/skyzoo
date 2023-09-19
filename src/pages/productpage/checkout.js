import React, { useEffect, useState } from 'react';
import './checkout.css';
import logo from '../../assets/logo.webp';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useNavigate } from 'react-router';
import cash from '../../assets/cash.png'
import options from '../../assets/options.svg'
import axiosClient from './axios_client';
import Logo from '../../components/Logo';


function Checkout() {


    const { cartItems, calculateTotal, discount } = useShoppingCart();
    const [step, setStep] = useState(1);
    const [payementMethod, setpayementMethod] = useState('');

    const Navigate = useNavigate()
    const initialFormData = {
        firstName: 'tester',
        lastName: 'test',
        phone: +'0699887766',
        email: 'testing@tester.com',
        address: 'street 1 avenue 1',
        city: 'casablanca',
        country: 'maroc',
        zip: 10000,
    };

    const initialFormErrors = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        address2: '',
        city: '',
        country: '',
        zip: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    // Separate formErrors states for each step
    const [formErrorsStep1, setFormErrorsStep1] = useState({});
    const [formErrorsStep2, setFormErrorsStep2] = useState({});


    const handleNextStep = (event) => {
        event.preventDefault();

        // Validate the form data before proceeding to the next step
        const newFormErrors = {};
        let requiredFields = [];

        switch (step) {
            case 1:
                requiredFields = ['firstName', 'lastName', 'phone', 'email'];
                break;
            case 2:
                requiredFields = ['address', 'city', 'country', 'zip'];
                break;
            // Add more cases for other steps if needed

            default:
                break;
        }

        requiredFields.forEach((field) => {
            if (typeof formData[field] === 'string' && formData[field].trim() === '') {
                newFormErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        // Set formErrors state based on the current step
        if (step === 1) {
            setFormErrorsStep1(newFormErrors);
        } else if (step === 2) {
            setFormErrorsStep2(newFormErrors);
        }

        // If there are errors, prevent moving to the next step
        if (Object.keys(newFormErrors).length > 0) {
            return;
        }

        // Proceed to the next step if there are no errors
        setStep(step + 1);
        console.log(formErrorsStep2);
    };




    const handlePrevStep = (event) => {
        event.preventDefault();
        setStep(step - 1);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const DataToSubmit = new FormData();

        try {
            DataToSubmit.append("first_name", initialFormData.firstName);
            DataToSubmit.append("last_name", initialFormData.lastName);
            DataToSubmit.append("phone", initialFormData.phone);
            DataToSubmit.append("email", initialFormData.email);
            DataToSubmit.append("adresse", initialFormData.address);
            DataToSubmit.append("city", initialFormData.city);
            DataToSubmit.append("country", initialFormData.country);
            DataToSubmit.append("zipcode", initialFormData.zip);
            DataToSubmit.append("total_price", calculateTotal(cartItems));
            DataToSubmit.append("discount", discount);
            DataToSubmit.append("payement_method", payementMethod);
            DataToSubmit.append("status", 'pending');
            DataToSubmit.append("items", JSON.stringify(cartItems));

            console.log(cartItems);
            // convert the FormData into an object by iterating through its entries and constructing an object with key-value pairs
            const formDataObject = {};
            for (const [key, value] of DataToSubmit.entries()) {
                formDataObject[key] = value;
            }
            sessionStorage.setItem('DataToSubmit', JSON.stringify(formDataObject));
            // console.log(DataToSubmit);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            };

            // Check if the selected payment method is 'card'
            if (payementMethod === 'card') {
                // Call an API endpoint on your backend to initiate a Stripe Payment Intent
                const response = await axiosClient.post(
                    "/stripe",
                    {cartItems : JSON.stringify(cartItems),
                        amount: calculateTotal(cartItems), // Send the order amount to the backend
                        currency: 'MAD', // Replace with your desired currency
                    }
                );

                window.location.href = response.data.redirectUrl;


                // if (result.error) {
                //     // Handle payment error
                //     console.log(result.error.message);
                // } else {
                //     // Payment succeeded, create the order on your backend
                //     // Use the DataToSubmit to send order details
                // }
            } else {
                // Handle other payment methods here
                Navigate('/thankYouPage')
            }
        } catch (error) {
            console.log(error);
            // message.error("Error placing order");
        }
    };




    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <form onSubmit={handleNextStep}>
                            <h3>Your Details</h3>
                            <div className="name-container">
                                <div>
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder={formErrorsStep1.firstName ? `${formErrorsStep1.firstName}` : 'First Name'}
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={formErrorsStep1.firstName && 'errorClass'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder={formErrorsStep1.lastName ? `${formErrorsStep1.lastName}` : 'Last Name'}
                                        className={formErrorsStep1.lastName && 'errorClass'}
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder={formErrorsStep1.phone ? `${formErrorsStep1.phone}` : 'Last Name'}
                                className={formErrorsStep1.phone && 'errorClass'}
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder={formErrorsStep1.email ? `${formErrorsStep1.email}` : 'Last Name'}
                                className={formErrorsStep1.email && 'errorClass'}
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleNextStep}>Next</button>
                        </form>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <form onSubmit={handleNextStep}>
                            <h3>Shipping Details</h3>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                placeholder={formErrorsStep2.address ? `${formErrorsStep2.address}` : 'Last Name'}
                                className={formErrorsStep2.address && 'errorClass'}
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="address2">Address 2</label>
                            <input
                                type="text"
                                id="address2"
                                placeholder={formErrorsStep2.address2 ? `${formErrorsStep2.address2}` : 'Last Name'}
                                className={formErrorsStep2.address2 && 'errorClass'}
                                value={formData.address2}
                                onChange={handleInputChange}
                            />
                            <div className="address-container">
                                <div>
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        placeholder={formErrorsStep2.city ? `${formErrorsStep2.city}` : 'Last Name'}
                                        className={formErrorsStep2.city && 'errorClass'}
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />

                                </div>
                                <div>
                                    <label htmlFor="country">Country</label>
                                    <input
                                        type="text"
                                        id="country"
                                        placeholder={formErrorsStep2.country ? `${formErrorsStep2.country}` : 'Last Name'}
                                        className={formErrorsStep2.country && 'errorClass'}
                                        value={formData.country}
                                        onChange={handleInputChange}
                                    />

                                </div>
                                <div>
                                    <label htmlFor="zip">Zip</label>
                                    <input
                                        type="number"
                                        id="zip"
                                        placeholder={formErrorsStep2.zip ? `${formErrorsStep2.zip}` : 'Last Name'}
                                        className={formErrorsStep2.zip && 'errorClass'}
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                    />

                                </div>
                            </div>
                            {/* <div className='ShippingIsBilling'>
                                <input type="checkbox" name="billingAdresse" id="billingAdresse" />
                                <label htmlFor="billingAdresse">Billing adresse is the same as shipping adresse </label>
                            </div> */}
                            <button className="backbtn" onClick={handlePrevStep}>
                                Back
                            </button>
                            <button onClick={handleNextStep}>Next</button>
                        </form>
                    </div>
                );
            case 3:
                return (
                    <div className='billing-container'>
                        <form>
                            <h3>Billing Options</h3>
                            <div className='billig-input-container'>
                                {/* <label htmlFor="paypal">
                                    <div>
                                        <input type="radio" name="payement" id="paypal" value='paypal' onChange={(e) => { setpayementMethod(e.target.value) }} />
                                        <h6>paypal</h6>
                                    </div>
                                    <img src={paypal} alt="paypal" />
                                </label>
                                <hr /> */}
                                <label htmlFor="card">
                                    <div>

                                        <input type="radio" name="payement" id="card" value='card' onChange={({target}) => { setpayementMethod(target.value) }} />
                                        <h6>Credit or debit card</h6>
                                    </div>
                                    <img src={options} alt="card" />
                                </label>
                                <hr />
                                <label htmlFor="cash">
                                    <div>

                                        <input type="radio" name="payement" id="cash" value='cash' onChange={(e) => { setpayementMethod(e.target.value) }} />
                                        <h6>Cash on Delivery</h6>
                                    </div>
                                    <img src={cash} alt="cash" style={{width : '40px'}}/>
                                </label>

                            </div>
                            <button className="backbtn" onClick={handlePrevStep}>
                                Back
                            </button>
                            <button onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="checkout-container">
            <div className="checkout-content">
                {/* <Elements stripe={stripePromise}>
                </Elements> */}
                <div className="checkout-header">
                    <Logo/>
                    <h4>
                        {cartItems.length} items | {calculateTotal(cartItems)} DH
                    </h4>
                </div>
                <div className="checkout-steps">{renderStep()}</div>

                <div className="checkout-footer">
                    <span className={step >= 1 ? 'active' : ''}>details</span>
                    <span className={step >= 2 ? 'active' : ''}>shipping</span>
                    <span className={step === 3 ? 'active' : ''}>details</span>
                </div>
            </div>
            <div className="upsale"></div>
        </div>
    );
}

export default Checkout;