import React, { useState } from 'react'
import "./product.css"
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { itemDetail } from '../../redux/features/productSlice';

function Product({ id, title, image, price, description, tags }) {
  const dispatch = useDispatch();
  const item={
    id:id,
    title:title,
    image:image,
    price:price,
    description:description,
    tags:tags
  }
  const navigate = useNavigate();
  const productDetails = (item) => {
    // navigate(`/products/${id}`)
    dispatch(itemDetail(item))
    navigate("/productdetails")
  }

  return (
    <div className="product">
      <img src={image} alt="" onClick={()=>productDetails(item)} />
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>Rs.</small>
          <strong>{price}</strong>
        </p>
      </div>
    </div>

  )
}

export default Product