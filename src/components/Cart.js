import React, { useState, useContext } from 'react';


// Material UI
import { makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


import {CartContext} from './Context';
import Product from './Product';


const Cart = (props) =>{
    const [cart,setCart] = useContext(CartContext);
    const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0)
    const productNames = cart.reduce((acc, curr) => acc + curr.name, ' \n')

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
                <Product
                key = {product.sku}
                sku = {product.sku}
                // cartStatus={cartStatus}
                // setCartStatus={setCartStatus}
                title = {product.title}
                description = {product.description}
                price = {product.price}
                // addToCart = {handleDrawerOpen}
                />))}
                </div>
            <span>items in cart: {cart.length}</span>
            <br/>
            <span>total price: {totalPrice} </span>
            <br/>
            <span>names: {productNames} </span>

        </Drawer>
        
    
        </div>)
}

export default Cart;