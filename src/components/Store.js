
import Product from './Product';
import Cart from './Cart';

import React, { useEffect, useState, useContext } from 'react';


// rbx styling
import "rbx/index.css";
import { Navbar, Button, Column} from "rbx";


// Material UI
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyAyFTsJYPUIc3tcerqB8fDeJ5LA_7fSxrY",
  authDomain: "shopping-cart-b9a00.firebaseapp.com",
  databaseURL: "https://shopping-cart-b9a00.firebaseio.com",
  projectId: "shopping-cart-b9a00",
  storageBucket: "shopping-cart-b9a00.appspot.com",
  messagingSenderId: "765408944194",
  appId: "1:765408944194:web:4506e7f0d211a3f3764ddb",
  measurementId: "G-2J1MFXD1L2"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();



const Store = () =>{
  
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const products = Object.values(data);
  
  const [cartStatus, setCartStatus]=useState(false);
  const [inventory, setInventory] = useState({});
  

   useEffect(() => {

    const handleData = snap => {
    
      if (snap.val()) setInventory(snap.val().inventory)
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

 
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);
  

  return (
    (inventory === null) ? null : 
   <div>
      
     <Navbar color="light">
     <Navbar.Brand>
    <Navbar.Item href="#">
      <img
        src="https://cdn.businessoffashion.com/brand/bof-logo.svg"
        alt="logo"
        role="presentation"
        width="112"
        height="28"
      />
    </Navbar.Item>
    <Navbar.Burger />
  </Navbar.Brand>
  <Navbar.Menu>
    <Navbar.Segment align="start">
      <Navbar.Item>Home</Navbar.Item>
      <Navbar.Item>Sale</Navbar.Item>

      <Navbar.Item dropdown>
        <Navbar.Link>More</Navbar.Link>
        <Navbar.Dropdown>
          <Navbar.Item>About</Navbar.Item>
          <Navbar.Item>Jobs</Navbar.Item>
          <Navbar.Item>Contact</Navbar.Item>
          <Navbar.Divider />
          <Navbar.Item>Report an issue</Navbar.Item>
        </Navbar.Dropdown>
      </Navbar.Item>
    </Navbar.Segment>

    <Navbar.Segment align="end">
      <Navbar.Item>
        <Button.Group>
          <Button color="dark">
            <strong>Sign up</strong>
          </Button>
          <Button color="light">Log in</Button>
        </Button.Group>
      </Navbar.Item>
    </Navbar.Segment>
    <IconButton onClick={handleDrawerOpen}>
      <AddShoppingCartIcon color="primary" aria-label="add to shopping cart"/>
    </IconButton>
    
  </Navbar.Menu>
 
    </Navbar>

    <Cart
        status={open}
        setClose={handleDrawerClose}
        inventory={inventory}
        setInventory={setInventory}
    />

    
    <Column.Group vcentered multiline>

      {products.map(product => 
        <Column 
          key={product}
          size="one-quarter">
            
        <Product
          key = {product.sku}
          sku = {product.sku}
          title = {product.title}
          description = {product.description}
          price = {product.price}
          addToCart = {handleDrawerOpen}
          inventory = {inventory}
          setInventory = {setInventory}
          // saveMySize = {saveMySize}
        />
        {console.log(inventory)}
        </Column>)}
    </Column.Group>
    </div>)
}

export default Store;