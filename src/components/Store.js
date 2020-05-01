
import Product from './Product';
import Cart from './Cart';

import React, { useEffect, useState, useContext } from 'react';


// rbx styling
import "rbx/index.css";
import { Navbar, Button, Column} from "rbx";


// Material UI
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';




const Store = () =>{
  
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const products = Object.values(data);
  
  const [cartStatus, setCartStatus]=useState(false);
  const [inventory, setInventory] = useState({});
  const myInventory = Object.values(inventory);
  // const sizes = Object.values(myInventory);
  // console.log(myInventory)

 
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('./data/inventory.json');
      const json = await response.json();
      setInventory(json);
    };
    fetchInventory();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);


  return (
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
        />
        {console.log(inventory)}
        </Column>)}
    </Column.Group>
    </div>)
}

export default Store;