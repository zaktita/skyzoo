import { createContext, useContext, useEffect, useState } from "react";



const ShoppingCartContext = createContext({});


const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

const ShoppingCartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(initialCartItems);
  // const [selectedProduct, setSelectedProduct] = useState([])
  // const [quantity, setQuantity] = useState(1);


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


  // const increaseCartQuantity = (id) => {
  //   setCartItems((currItems) => {
  //     if (currItems.find((item) => item.id === id) == null) {
  //       return [...currItems, { id, quantity: 1 }];
  //     } else {
  //       return currItems.map((item) => {
  //         if (item.id === id) {
  //           return { ...item, quantity: item.quantity + 1 };
  //         } else {
  //           return item;
  //         }
  //       });
  //     }
  //   });
  // };
  // const decreaseCartQuantity = (id) => {
  //   setCartItems((currItems) => {
  //     if (currItems.find((item) => item.id === id)?.quantity === 1) {
  //       return currItems.filter((item) => item.id !== id);
  //     } else {
  //       return currItems.map((item) => {
  //         if (item.id === id) {
  //           return { ...item, quantity: item.quantity - 1 };
  //         } else {
  //           return item;
  //         }
  //       });
  //     }
  //   });
  // };
  const removeFromCart = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
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
        // increaseCartQuantity,
        // decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        updatecartItems,
        calculateTotal,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};