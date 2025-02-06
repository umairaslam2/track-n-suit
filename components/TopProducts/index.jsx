"use client"
import React, { useEffect, useState } from 'react'
import {ProductCard} from '@/components'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay, } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { ProductSkeleton } from './productSkeleton';
import { addToCart } from "@/GlobalRedux/Slices/addToCart";
import { AddToCart, getCartItem } from '@/API/response';
import { getCartItemStart, getCartItemSuccess } from '@/GlobalRedux/Slices/allCartItems';

export const TopProducts = ({filterData}) => {
  const [IsLoading, setIsLoading] = useState(false)
  const {allProducts,isLoader} = useSelector((state)=> state.allproducts)
  const cartItems = useSelector((state) => state.cart.items);
  // console.log("cartItems",cartItems)
  const dispatch = useDispatch()
  const handleAddToCart = async (productId, quantity) => {
    // console.log(" product id ", productId, quantity)
    // const sessionId = getSessionId();
    // console.log('session Id', sessionId);
    const getCartProducts = async () => {
          const getSessionId = localStorage.getItem("sessionId")
          try {
            dispatch(getCartItemStart())
            const response = await getCartItem("cart/getCart", getSessionId);
            dispatch(getCartItemSuccess(response))
          } catch (error) {
            console.log(error)
          }
        }
    try {
      setIsLoading(true)
    const response =await AddToCart(productId, quantity,"cart/addToCart")
    // console.log("response", response)
    setIsLoading(false)
      if(response.status == 200){
      //  successNotify(response?.data?.message)
        dispatch(addToCart(response?.data?.cart?.items))
        getCartProducts()
      }
      else{
        console.log(response.message)
      }
    } catch (error) {
      console.log("error",error)
    }

  };
  
  // console.log(allProducts._id)
  // const sessionId = getSessionId();
 
  useEffect(() => {
    const swiper = document.querySelector('.swiper');
    if (swiper) {
      swiper.swiper.navigation.init();
      swiper.swiper.navigation.update();
    }
  }, []);
  return (
    <>
    <Swiper
    modules={[Navigation, Pagination, A11y, Autoplay]}
    spaceBetween={20}
    navigation={{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }}
    style={{
      '--swiper-navigation-size': '20px', 
      
    }}
    // pagination={{ clickable: true }}
    autoplay={{ 
      delay: 3000,
      disableOnInteraction: false,
    }}
    breakpoints={{
      340: { slidesPerView: 1.5 }, // Small screens
      768: { slidesPerView: 2.5 }, // Medium screens
      1024: { slidesPerView: 3.5 }, // Large screens
      // 1280: { slidesPerView: 4.5 }, // Extra-large screens
    }}
    loop
    className="relative w-full h-full"
  >
   {
   isLoader ? <ProductSkeleton/> :
   filterData.map((item, index) => (
        <SwiperSlide key={index} className=" font-sans h-[420px] ">
          <ProductCard id={item._id} url={item.images[0]} title={item.name} price1={item.price} price2={item.comparePrice} onAddToCart={() => handleAddToCart(item._id,1)} loading={IsLoading}/>
        </SwiperSlide>
      ))}
     <div className="swiper-button-prev bg-gray-400  p-4 hover:p-5 rounded-full text-black"></div>
     <div className="swiper-button-next bg-gray-400  p-4 hover:p-5 rounded-full text-black"></div>
   </Swiper>
     <ToastContainer/>
     </>
  )
}
