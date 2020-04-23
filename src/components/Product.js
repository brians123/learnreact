import React from 'react';
import { Card, Image, Media, Title, Content, Button } from "rbx";

const Product = (props) => {
    const sizes = ['XS','S','M','L']

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
                rounded >
                {size}
            </Button>
            )}
        </Button.Group>
        <Button
            onClick = {props.addToCart}>
            Add To Cart
        </Button>
        </Card.Content>
    </Card>
    )  
}

export default Product; 