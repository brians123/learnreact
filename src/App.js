import React, { useEffect, useState } from 'react';
import './App.css';

// rbx styling
import "rbx/index.css";
import { Navbar, Button, Column} from "rbx";

// Components
import Product from './components/Product';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
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
  </Navbar.Menu>
     </Navbar>
    
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
        price = {product.price}/>
        </Column>)}
    </Column.Group>
    </div>
  );
};

export default App;