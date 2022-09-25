import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from '../../redux/features/authSlice';
import "./header.css"


function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const{cartTotalQuantity} =useSelector(state=>state.cart)
    const { address } = useSelector((state) => state.address)

    const handleLogout = () => {
        dispatch(setLogout());
    }
   
    const { user } = useSelector((state) => ({ ...state.auth }))

    console.log("user details>>",user)
    return (
        <div className='header'>
            <div className="navbar__component">
                <Link to="/">
                    <div className="navbar__logo"></div>
                </Link>
                <div className="navbar__locator">
                    <div className="navbar__locatorImage"></div>
                    <div className="navbar__location">{address?.city ?(`${address.city}`):("Select Your Address")} </div>
                </div>
                <div className="navbar__searchcomponent">
                    <div>
                        <select className="nav__dropdown">
                            <option value="All">All</option>
                            <option value="Alexa">Alexa</option>
                            <option value="Books">Books</option>
                            <option value="Baby">Baby</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Clothes">Clothes</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" className="navbar__searchbox" />
                    </div>
                    <div className="navbar__searchboxdiv">
                        <div className="navbar__searchicon" />
                    </div>
                </div>
                <div className="navbar_text navbar__signin">

                    {
                        user?.result._id ? (
                            <div className="dropdown">
                                <div style={{ fontSize: "14px" }}>Welcome</div>
                                <div className="dropbtn" style={{ fontWeight: "bold" }}>{user?.result.name}</div>
                                <div className="dropdown-content" >
                                    <a href="#">Link 2</a>
                                    <a href="#">Link 3</a>
                                    <a href="#" onClick={handleLogout}>Logout</a>
                                </div>
                                
                            </div>
                        ) : (
                            <div className="dropdown">
                                <div style={{ fontSize: "14px" }}>Sign In</div>
                                <div className="dropbtn" style={{ fontWeight: "bold" }}>Account & List</div>
                                <div className="dropdown-content">
                                    <a href="/login">Sign In</a>
                                    <a href="#">Link 2</a>
                                    <a href="#">Link 3</a>
                                </div>
                            </div>
                        )
                    }



                </div>
                <div className="navbar_text navbar__returns">
                    <div style={{ fontSize: "14px" }}>Returns</div>
                    <div style={{ fontWeight: "bold" }}> & Order</div>
                </div>
                <Link to={"/cart"}>
                    <div className="navbar_text navbar__cart">
                        <div src="" className="cart__image" ></div>
                        <div className="cart__item"> {cartTotalQuantity} </div>
                        <div className="navbar_text_cart">Cart</div>
                    </div>
                </Link>

            </div>
            <div className="navbar__footer">
                <div className="navbar__footer_text">Best Seller</div>
                <div className="navbar__footer_text">Mobile</div>
                <div className="navbar__footer_text">Amazon Pay</div>
                <div className="navbar__footer_text">Fashion</div>
                <div className="navbar__footer_text">Electronics</div>
                <div className="navbar__footer_text">Prime</div>
                <div className="navbar__footer_text">New Release</div>
                <div className="navbar__footer_text">Customer Service</div>
                <div className="navbar__footer_text">Computers</div>
                <div className="navbar__footer_text">Home & Kitchen</div>
            </div>
        </div>
    )
}

export default Header