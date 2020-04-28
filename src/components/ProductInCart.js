import React, { useContext,useState } from 'react';

// rbx styling
import { Card, Image, Media, Title, Content, Button } from "rbx";

// Cart Context
import CartProvider from './Context';
import {CartContext} from './Context'


const ProductInCart = (props) => {
    const [cart,setCart] = useContext(CartContext);

    const sizes = ['XS','S','M','L']

    // const addToCart = () =>{
    //     const tshirt = {
    //         name: props.title, 
    //         price: props.price,
            
    //     }
    //     setCart(prevState => [...prevState, tshirt])
        
    // }

    // const deleteFromCart = (index) => () =>{
    //     const tempItems = [...cart].filter((s,sidx) => index !== sidx)
    //     console.log(tempItems);
    //     setCart(prevCart => ({prevCart, tempItems}))
    // }

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

        {/* <Button.Group >
            {sizes.map(size=>
            <Button 
                rounded >
                {size}
            </Button>
            )}
        </Button.Group> */}

        <Button
            onClick = {()=>{props.deleteFromCart()}}
            >
            Delete
        </Button>
        </Card.Content>
    </Card>
    )  
}

export default ProductInCart; 