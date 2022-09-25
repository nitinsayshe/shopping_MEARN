

import "./home.css"
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Product from '../Product/Product'
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../redux/features/productSlice";
import Carousel from "react-material-ui-carousel";


const bannerData = [
    "https://m.media-amazon.com/images/I/716acwUvxML._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/71xqwOfit3L._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/71ofXEm4AdL._SX3000_.jpg",

];

function Home() {
    const { items, loading } = useSelector((state) => ({ ...state.product }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
        console.log("product>from home",items)
    }, []);

    if (loading) {
        return <h2>Loading ....</h2>
    }
    return (
        <div className="home">
            
            <Carousel
                className='carousel'
                autoplay={true}
                animation="slide"
                indicators={false}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        background: "#fff",
                        color: "#494949",
                        borderRadius: 0,
                        margin: 0,
                    },
                }}>
                {bannerData.map((item) => (
                    <img src={item} alt="" className="banner_image" />
                ))}
            </Carousel>
            <div className="home__row">
                {items && items.map((product) => (
                    <Product
                        id={product._id}
                        price={product.price}
                        image={product.image}
                        title={product.title}
                        description={product.description}
                    />
                    //<h2>Testinp product</h2>
                ))}
            </div>

        </div>
    )
}

export default Home