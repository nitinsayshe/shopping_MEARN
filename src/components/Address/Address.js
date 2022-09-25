import React, { useState } from 'react'
import "./address.css"
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { addressItem } from '../../redux/features/addressSlice';
const initialState = {
    fullName: "",
    phone: "",
    flat: "",
    area: "",
    landmark: "",
    city: "",
    state: ""
}
function Address() {
    const cart = useSelector((state) => state.cart);
    const { address } = useSelector((state) => state.address)
    console.log(address)
    const [formValue, setFormValue] = useState(initialState);
    const { fullName, flat, area, landmark, city, state, phone } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const onInputChange = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })

    };
    const handleSubmit = (formValue) => {
        if (fullName && flat && area && landmark && city && state && phone) {
            dispatch(addressItem({ formValue }))
        }
    };

    return (

        <div class="address">
            <div className="left_nav_logo">
                <Link to="/">
                    <img src="./amazonlogo.jpg" alt="" className="address_logo" />
                </Link>
                <img src="./nav-addrpay.PNG" alt="" />

            </div>

            {/* <img src="./amazonlogo.jpg" alt="" className="address_logo" /> */}
            <div className='float-container'>
                <div className="address_container">
                    <h1>Select a delivery address</h1>
                    <form>
                        <h5>Full Name</h5>
                        <input type="text" onChange={onInputChange} name="fullName" value={fullName} />
                        <h5>Phone No</h5>
                        <input type="text" onChange={onInputChange} name="phone" value={phone} />
                        <h5>Flat House no, Building, Company, Appartment</h5>
                        <input type="text" onChange={onInputChange} name="flat" value={flat} />
                        <h5>Area, Colony, Street, Village</h5>
                        <input type="text" onChange={onInputChange} name="area" value={area} />
                        <h5>Landmark</h5>
                        <input type="text" onChange={onInputChange} name="landmark" value={landmark} />
                        <h5>Town/City</h5>
                        <input type="text" onChange={onInputChange} name="city" value={city} />
                        <h5>State</h5>
                        <input type="text" onChange={onInputChange} name="state" value={state} />

                        <button
                            onClick={() => handleSubmit(formValue)}
                            type="submit" className="Deliver_to_Addr_Button">
                            Deliver To This Address
                        </button>
                    </form>
                    {/* <div>
                        <p>{address.fullName}</p>
                        <p>{address.phone}</p>
                        <p>{address.flat}</p>
                        <p>{address.area}</p>
                        <p>{address.landmark}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                    </div> */}
                </div>
                <div className="address-cart-details">
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
                                                    {/* <p>{cartItem.description}</p> */}

                                                </div>
                                            </div>
                                            <div className="cart-product-price">Rs.{cartItem.price}</div>
                                            <div className="cart-product-quantity">

                                                <div className="count">{cartItem.cartQuantity}</div>

                                            </div>
                                            <div className="cart-product-total-price">
                                                Rs.{cartItem.price * cartItem.cartQuantity}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="cart-summary">
                                        {/* <button className="clear-cart" >
                                 Clear Cart
                             </button> */}
                                        <div className="cart-checkout">
                                            <div className="subtotal">
                                                <span>SubTotal</span>
                                                <span className="amount">Rs.{cart.cartTotalAmount}</span>
                                            </div>
                                            <p>Taxes and shipping calculated at checkout</p>

                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address