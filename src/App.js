import React from 'react';
import './App.css';

// Components
import CartProvider from './components/Context';
import {CartContext} from './components/Context'
import Store from './components/Store';


const App = () => {
  return(
  <CartProvider>
    <Store>

    </Store>
  </CartProvider>)
  
};

export default App;