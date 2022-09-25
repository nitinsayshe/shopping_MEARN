import React from 'react'
import { useEffect } from 'react';
import { useSelector ,useDispatch} from "react-redux"
import { Link ,useNavigate} from "react-router-dom"
import Header from "../Header/Header";


import { addToCart1, decreaseCart,IncreaseCart, removeFromCart,clearCart, getTotals } from '../../redux/features/cartSlice';
import "./cart.css"


function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(getTotals())
    },[cart,dispatch])
    const handleRemoveFromCart=(cartItem)=>{
        dispatch(removeFromCart(cartItem))
    }
    const handleDecreaseCart=(cartItem)=>{
        dispatch(decreaseCart(cartItem))
    }
    const handleIncreaseCart=(cartItem)=>{
        dispatch(IncreaseCart(cartItem))
    }
    const handleClearCart=()=>{
        dispatch(clearCart())
    }
    const handleOnCheckout=()=>{
       navigate("/address")
    }
    return (
        <>
        <div className='cart-container'>
             
            <h2>Shopping Cart</h2>
            {
                cart.cartItems.length === 0 ? (
                    <div className='cart-empty'>
                        <p>Your Cart is Empty</p>
                        <div className='start-shopping'>
                            <Link to="/">
                                <span>Start Shopping</span>
                            </Link>
                        </div>
                    </div>
                ) : (<div>
                    <div className='titles'>
                        <h3 className='product-title'>Product</h3>
                        <h3 className='product-price'>Price</h3>
                        <h3 className='product-quantity'>Quantity</h3>
                        <h3 className='product-total'>Total</h3>
                    </div>
                    <div className='cart-items'>
                        {cart.cartItems?.map(cartItem => (
                            <div className='cart-item' key={cartItem.id}>
                                <div className="cart-product">
                                    <img src={cartItem.image} alt={cartItem.image} />
                                    <div>
                                        <h3>{cartItem.title}</h3>
                                        <p>{cartItem.description}</p>
                                        <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                                    </div>
                                </div>
                                <div className="cart-product-price">Rs.{cartItem.price}</div>
                                <div className="cart-product-quantity">
                                    <button onClick={()=>handleDecreaseCart(cartItem)}>-</button>
                                    <div className="count">{cartItem.cartQuantity}</div>
                                    <button onClick={()=>handleIncreaseCart(cartItem)}>+</button>
                                </div>
                                <div className="cart-product-total-price">
                                    Rs.{cartItem.price * cartItem.cartQuantity}
                                </div>
                            </div>
                        ))}
                        <div className="cart-summary">
                            <button className="clear-cart" onClick={() => handleClearCart()}>
                                Clear Cart
                            </button>
                            <div className="cart-checkout">
                                <div className="subtotal">
                                    <span>SubTotal</span>
                                    <span className="amount">Rs.{cart.cartTotalAmount}</span>
                                </div>
                                <p>Taxes and shipping calculated at checkout</p>
                                <button onClick={() => handleOnCheckout()}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
        </>
    )
}

export default Cart