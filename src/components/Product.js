import React, { useContext,useState, useEffect } from 'react';

// rbx styling
import { Card, Image, Media, Title, Content, Button } from "rbx";

// Cart Context
import CartProvider from './Context';
import {CartContext} from './Context'


import firebase from 'firebase/app';
import 'firebase/database';

import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const sizes = ['XS','S','M','L']

const Product = (props) => {
    const [mySize, setMySize]=useState('');
    const [cart,setCart] = useContext(CartContext);
    // console.log(Object.values(inventory))

    const addToCart = (size) =>{
        const tshirt = {
            name: props.title, 
            sku: props.sku,
            size: mySize,
            // aSize: mysize,
            price: props.price,
        }
        setCart(prevState => [...prevState, tshirt])
        let newInventory = props.inventory;
        newInventory[props.sku][size] = newInventory[props.sku][size] - 1;
        props.setInventory(newInventory)

        if (props.userState.user){
            firebase.database().ref('carts/' + props.userState.user.uid).set(cart)
        }
        
    }

    // console.log(props.inventory[props.sku]);
    const inStock = (size)=>{
        if (props.inventory[props.sku] !== undefined){
            // console.log(props.inventory);
            // console.log(props.inventory[props.sku])
            // console.log(props.inventory[props.sku][size])

        return props.inventory[props.sku][size] > 0;
        }
    }

    const saveMySize = (event) =>{
        setMySize(event.target.value);
        console.log(mySize)
    }

    return(
    <Card>
        <Card.Image>
            <Image.Container size="1by0.01">
                <Image src={'./data/products/' + props.sku+'_1.jpg'} />
            </Image.Container>
            </Card.Image>
        <Card.Content>
            <Media>
                <Media.Item>
                <Title as="p" size={4}>
                    {props.title}
                </Title>
                <Title as="p" subtitle size={6}>
                    ${props.price}
                </Title>
                </Media.Item>
            </Media>
        <Content>
            {props.description}
            <br />
        </Content>
        <Button.Group >
            {sizes.map(size=>
            <Button 
                disabled={!inStock(size)}
                rounded 
                value={size}
                onClick = {saveMySize}>
                {size}
                {/* {console.log(props.inventory[props.sku]['S'])} */}
                {/* {console.log(props.inventory[props.sku][mySize])} */}
            </Button>
            )}
        </Button.Group>
        <Button 
            onClick = {()=> {props.addToCart(); addToCart(mySize)}}>
            Add To Cart
            
            
        </Button>
        </Card.Content>
    </Card>
    
    
    )  
}

export default Product; 