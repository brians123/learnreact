import React, { useState, useContext } from 'react';


// Material UI
import { makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {  Button}  from "rbx";


import {CartContext} from './Context';
import ProductInCart from './ProductInCart';


import firebase from 'firebase/app';
import 'firebase/database';

import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const Cart = (props) =>{
    const [cart,setCart] = useContext(CartContext);
    const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0)

    const handleCheckout = () => {
        setCart([])
      };

    const drawerWidth = 240;
    const useStyles = makeStyles((theme) => ({
        root: {
        display: 'flex',
        },
        appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        },
        appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
        },
        title: {
        flexGrow: 1,
        },
        hide: {
        display: 'none',
        },
        drawer: {
        width: drawerWidth,
        flexShrink: 0,
        },
        drawerPaper: {
        width: drawerWidth,
        },
        drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
        },
        content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        },
        contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
        },
    }));
    const classes = useStyles();
    const theme = useTheme();
    
    
    const [open, setOpen] = useState(false);


    const deleteFromCart = (index) => () =>{
        const tempItems = [...cart].filter((s,sidx) => index !== sidx)
        // console.log(tempItems);
        setCart([...tempItems])
        let newState = Object.assign({}, cart);
        // console.log(newState);
        // console.log(newState[index].sku);
        const sku = newState[index].sku;
        const size = newState[index].size;
        // console.log(size)
        // console.log(sku);
        let newInventory = props.inventory;
        newInventory[sku][size] += 1;
        props.setInventory(newInventory);

        if (props.userState.user){
            if (cart.length === 1){
                console.log("in here");
                firebase.database().ref('carts/' + props.userState.user.uid).remove();
            }
            else{
                firebase.database().ref('carts/' + props.userState.user.uid).set(cart); 
            }
        }
    }

    return (
    <div>
        
    <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={props.status}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
            <IconButton onClick={props.setClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </div>
            <Divider />
            <div>{cart.map((product, index)=>(
                <ProductInCart
                key = {index}
                sku = {product.sku}
                // cartStatus={cartStatus}
                // setCartStatus={setCartStatus}
                title = {product.title}
                description = {product.description}
                price = {product.price}
                deleteFromCart = {deleteFromCart(index)}
                size = {cart[index].size}
                userState={props.userState}
                />))}
                </div>
            <span>No. of Items: {cart.length}</span>
            <span>Total: ${totalPrice} </span>
            <Button onClick={handleCheckout}>
                CHECKOUT
            </Button>


        </Drawer>
        
    
        </div>)
}

export default Cart;