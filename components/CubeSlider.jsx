import React from 'react'
import { useEffect } from 'react';
const CubeSlider = ({images}) => {
useEffect(()=>{
    images.map((image,i)=>{
      document.documentElement.style.setProperty('--image'+`${i+1}`, 'url('+ `${image}` +')');
    })
},[])
  return (
    <>
    <div class="wrapper">
        <div class="slider">
            <div class="container">
                <div class="slide x"></div>
                <div class="slide y"></div>
                <div class="slide z"></div>
            </div>
            <div class="shadow"></div>
        </div>
    </div>
    </>
  )
}







export default CubeSlider