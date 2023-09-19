import { createContext, useContext, useEffect, useState } from "react";



const ShoppingCartContext = createContext({});


const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

const ShoppingCartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [discount, setDiscount] = useState(localStorage.getItem('discount'));


  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const updatecartItems = (product) => {
    setCartItems(product);
  };


  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };



  // const removeFromCart = (id) => {
  //   setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  // };

  const removeFromCart = (item_id) => {
    // Remove product from cartItems
    setCartItems(cartItems.filter((item) => item.item_id !== item_id));
  };
  const calculateTotal = (cartItems) => {
    return cartItems.reduce((accumulator, product) => {
      return accumulator + product.totalPrice;
    }, 0);
  };

 

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        updatecartItems,
        calculateTotal,
        discount,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
export const useShoppingCart = () => { return useContext(ShoppingCartContext)};