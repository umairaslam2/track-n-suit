"use client"
import React, { useEffect,  } from 'react'
import {ProductCard} from '@/components'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay, } from 'swiper/modules';
import { AddToCart, getAllProducts, getCartItem } from '@/API/response';
import { getProductStart, getProductSuccess } from '@/GlobalRedux/Slices/allProducts';
import { useDispatch, useSelector } from 'react-redux';
import { errorNotify, successNotify } from '../Toast';
import { ProductSkeleton } from './productSkeleton';
import { addToCart } from '@/GlobalRedux/Slices/addToCart';
import { ToastContainer } from 'react-toastify';
import { getCartItemStart, getCartItemSuccess } from '@/GlobalRedux/Slices/allCartItems';
// export const TopProducts = ({category}) => {
export const AllHomeProduct = (productData) => {
  // console.log("product data",productData)
  const dispatch = useDispatch()
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
  
    const handleAddToCart = async (productId, quantity) => {
      // console.log(" product id ", productId, quantity)
      
      try {
        const response =await AddToCart(productId, quantity,"cart/addToCart")
        // console.log("response", response)
        
        if(response.status == 200){
          // successNotify(response?.data?.message)
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
  
  // get all products 
  const getAllProduct = async() => {
    // const route = `products`;  
    try {
      dispatch(getProductStart())
      // const response = await getAllProducts(route)
      dispatch(getProductSuccess(productData.productData))
      } catch (error) {
        errorNotify(error ||response.message)
      }
    }
    const {allProducts,isLoader} = useSelector((state)=> state.allproducts)
useEffect(()=>{
  getAllProduct()
},[])
  return (

    <>
    <Swiper
    modules={[Navigation, Pagination, A11y, Autoplay]}
    spaceBetween={20}
    // pagination={{ clickable: true }}
    autoplay={{ 
      delay: 3000,
      disableOnInteraction: false,
    }}
    breakpoints={{
      340: { slidesPerView: 1.5 }, // Small screens
      768: { slidesPerView: 2.5 }, // Medium screens
      1024: { slidesPerView: 3.5 }, // Large screens
      // 1280: { slidesPerView: 3.5 }, // Extra-large screens
    }}
    loop
    className="relative w-full h-full"
  >
   {
   isLoader ? <ProductSkeleton/> :
  allProducts?.map((item, index) => (
        <SwiperSlide key={index} className=" font-sans h-[420px] ">
          <ProductCard id={item._id} url={item.images[0]} title={item.name} price1={item.price} price2={item.comparePrice}  onAddToCart={() => handleAddToCart(item._id,1)}/>
        </SwiperSlide>
      ))}
    
   </Swiper>
   <ToastContainer/>
   </>
  )
}
