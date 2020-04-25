import React, {useState, createContext} from 'react';

export const CartContext = createContext(null);

const CartProvider = (props)=> {
    const [cart, setCart] = useState([]);

    // const addToCart = (item) => {
    //     setCart(prevState => [...prevState, item]);
    // }
    
    return(
        <CartContext.Provider
         value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider;