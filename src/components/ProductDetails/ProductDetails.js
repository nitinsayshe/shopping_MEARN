import React, { useEffect } from 'react'
import "./productdetails.css"
import { useParams, useNavigate } from 'react-router-dom'
import Header from "../Header/Header";
import { useSelector, useDispatch } from 'react-redux';
import { getProduct ,itemDetail} from '../../redux/features/productSlice';
import { addToCart, addToCart1 } from '../../redux/features/cartSlice'

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { itemDetails } = useSelector((state) => ({ ...state.product }));
  const { user } = useSelector((state) => ({ ...state.auth }))
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id))
    }
  }, [id])

  const handelSubmit = (e) => {
    e.preventDefault();
    if (itemDetails) {
      // const productData = { userId: user?.result?._id, productId: product._id, quantity: 1 }
      console.log("productData", itemDetails)
      dispatch(addToCart1({ itemDetails, navigate }))
      // navigate("/checkout")
    }
  };
  return (
    <>
    <Header/>
      <div className='productdetails'>
        <div className="productdetails_left">
          <img src={itemDetails.image} alt="" />
        </div>
        <div className="left_details">
          <h1>{itemDetails.title}</h1>
          <p>{itemDetails.description}</p>
          <h2>Rs: {itemDetails.price}</h2>
          <button onClick={handelSubmit}>Add to Cart</button>
        </div>
      </div>
    </>
  )
}

export default ProductDetails