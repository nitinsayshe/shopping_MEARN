import React from 'react'
import Carousel from "react-material-ui-carousel";
import "./banner.css"

const bannerData = [
  "https://m.media-amazon.com/images/I/716acwUvxML._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71xqwOfit3L._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71ofXEm4AdL._SX3000_.jpg",
 
];

function Banner() {
  return (
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
      }}

    >
      {bannerData.map((item) => (
        <img src={item} alt="" className="banner_image" />
      ))}
    </Carousel>
  );
}

export default Banner