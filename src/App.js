import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from "react-sidebar";

// rbx styling
import "rbx/index.css";
import { Navbar, Button, Column} from "rbx";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';

// Components
import Product from './components/Product';

const App = () => {
  const [data, setData] = useState({});
  const [cart, setCart] = useState(false);
  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const toggleCart = () =>{
    if (cart){
      setCart(false);
    }
    else{
      setCart(true);
    }
  }

  return (
   <div>
      
     <Navbar color="light">
     <Navbar.Brand>
    <Navbar.Item href="#">
      <img
        src="https://cdn.businessoffashion.com/brand/bof-logo.svg"
        alt=""
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
    <IconButton onClick={()=>{toggleCart()}}>
      <AddShoppingCartIcon color="primary" aria-label="add to shopping cart"/>
    </IconButton>
    
  </Navbar.Menu>
 
    </Navbar>
    <Sidebar
    sidebar={<b>Sidebar content</b>}
    open={cart}
    onClose={()=>{toggleCart()}}
    styles={{ sidebar: { background: "white" } }} >
      
    </Sidebar>
    
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
        addToCart = {toggleCart}/>
        </Column>)}
    </Column.Group>
    </div>
  );
};

export default App;