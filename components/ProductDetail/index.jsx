"use client"
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaGift, FaAward, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import {
  Card,
  CardBody,
  Typography,
  Button,
  List,
  ListItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import { Title, TopProducts } from "@/components";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getProductStart, getProductSuccess } from "@/GlobalRedux/Slices/allProducts";
import { AddToCart, EditCart, getAllProducts, getCartItem } from "@/API/response";
import { errorNotify } from "../Toast";
import { rgbDataURL } from "@/utils/rgbDtaurl";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getCartItemStart, getCartItemSuccess, updateCart } from "@/GlobalRedux/Slices/allCartItems";
import { addToCart } from "@/GlobalRedux/Slices/addToCart";

export function ProductDetail({ title, image, url, price, description, allFile, category, comparePrice, onAddToCart, onAddToCartInSm, cartData, quantity, decreaseCount, addCount , count}) {
  const [activeButton, setActiveButton] = useState(null);
  // const [count, setCount] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price || price);
  const [totalCount, setTotalCount] = useState(1);

  const dispatch = useDispatch()
  const { allProducts, isLoader } = useSelector((state) => state.allproducts)
  // const filteredProducts = allProducts?.filter((item) => item.category == category)
  const { allCartItem, } = useSelector((state) => state.cartItem)
  // console.log("cart data",cartData)
 
  // for discount % 
  let discount = ((comparePrice - price) / comparePrice) * 100
  let result = Math.round(discount)

  const getCartProducts = async () => {
    const getSessionId = localStorage.getItem("sessionId")
    try {
      dispatch(getCartItemStart())
      const response = await getCartItem("cart/getCart", getSessionId);
      console.log("cart response ", response)
      dispatch(getCartItemSuccess(response))
    } catch (error) {
      console.log(error)
    }
  }
  // get all products 
  const getAllProduct = async () => {
    // const route = `products?category=${category}`;  
    const route = `products`;
    try {
      dispatch(getProductStart())
      const response = await getAllProducts(route)
      // console.log("response--->", response)
      dispatch(getProductSuccess(response))
    } catch (error) {
      errorNotify(error || response.message)
    }
  }
  
  // edit cart quantity
  // const handleIncrement = async (item) => {
  //   try {
  //     console.log("item for API ", item)
  //     setCount(async (prevCount) => {
  //       let currentCount = isNaN(prevCount) || prevCount === 0 ? 1 : prevCount;
  //       setTotalCount(currentCount)
  //       try {
  //         const response = await AddToCart(item._id, currentCount , "cart/addToCart")
  //         console.log(response)
  //         if (response.status == 200) {
  //           dispatch(addToCart(response?.data?.cart?.items))
  //           getCartProducts()
  //         }
  //         else {
  //           console.log(response.message)
  //         }
  //       } catch (error) {
  //         console.log("error", error)
  //       }
        
  //     });
  //   } catch (error) {
  //     console.error("Error updating quantity:", error);
  //   }
  // };

  // const handleDecrement = async (item) => {
  //   try {
  //     const filterCartItem = allCartItem?.items.filter((ele) => ele.productId._id == item._id)
  //     if (count > 1) {
  //       setCount((prevCount) => {
  //         // console.log("prevCount",prevCount)
  //         const newQuantity = filterCartItem[0]?.quantity - prevCount;
  //         EditCart(item._id, "cart/editCartItem", newQuantity)
  //           .then((response) => {
  //             // console.log("response-->>>>", response);
  //             dispatch(updateCart({ productId: item._id, quantity: newQuantity }));
  //           })
  //           .catch((error) => console.error("Error updating quantity:", error))
  //         return newQuantity
  //       })
  //     }
  //   } catch (error) {
  //     console.error("Error updating quantity:", error);
  //   }
  // };

  const [showDescription, setShowDescription] = useState(true);
  const [showShipping, setShowShipping] = useState(false);

  const product = {
    name: 'SAIFUL MALOOK GIFT SET',
    priceOld: 2930,
    priceNew: 2750,
    description: 'Best-Selling Bundle',
    image: '/Images/about_img2.webp',
    features: [
      { text: 'Premium Fragrances Like Nowhere', icon: <FaCheckCircle className="text-green-500" /> },
      { text: 'Free Wrapping | Gift Card | Gift Bag', icon: <FaGift className="text-blue-500" /> },
      { text: 'Award Winning Fragrance Brand', icon: <FaAward className="text-yellow-500" /> },
    ],
  };
  
  useEffect(() => {
    getAllProduct()
    getCartProducts()
  }, [])
  return (
    <div className="container w-full mx-auto px-2 sm:px-4 pt-28  py-10 md:py-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Product Image */}
    <div className="w-full h-auto flex justify-center items-center md:mt-14 mt-6 sm:mt-8">
      <div className="w-full max-h-[400px] md:max-h-[500px] overflow-hidden">
        <Image
          src={url}
          alt="Product"
          // layout="responsive"
          width={800}
          height={800}
          className="w-full h-full object-contain"
        />
      </div>
    </div>

    {/* Product Details */}
    <div className="text-center md:text-left md:mt-16 md:max-w-lg">
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* <p className="text-gray-600 underline cursor-pointer mt-2">Write a review</p> */}
      <p className="text-lg font-semibold mt-2">Price</p>
      <p className="text-xl text-red-500 font-bold">
        <span className="line-through text-gray-500 mr-2">Rs.{comparePrice}</span>
        Rs.{price}
      </p>

      {/* Quantity */}
      <div className="mt-4 flex items-center justify-center md:justify-start gap-2">
        <p className="font-medium text-xl ">Quantity</p>
        <div className="flex items-center border px-3 py-1 rounded-lg gap-4">
          <button className="text-xl" onClick={decreaseCount}>-</button>
          <span className="text-lg">{count}</span>
          <button className="text-xl" onClick={addCount}>+</button>
        </div>
      </div>

      {/* List */}
      <ul className="mt-4 space-y-2">
        {product.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 justify-center md:justify-start">
            {feature.icon} {feature.text}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="mt-6 space-y-2 hidden lg:flex ">
        {/* <button onClick={onAddToCart} className="w-full border py-3 rounded-lg font-semibold" >Add to cart</button> */}
        <button onClick={onAddToCart} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold">Add To Cart</button>
      </div>
      <div className="mt-6 space-y-2 lg:hidden flex " >
        <button onClick={onAddToCartInSm} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold">Add To Cart</button>
      </div>
    </div>

    {/* Product Description */}
    <div className="w-full md:col-span-2">
      <div
        className="flex justify-between items-center bg-gray-200 px-4 py-3 rounded-lg cursor-pointer"
        onClick={() => setShowDescription(!showDescription)}
      >
        <span className="font-bold">BRIEF</span>
        {showDescription ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showDescription && (
        <div className="mt-2 p-4 border rounded-lg bg-white text-gray-700">
         {description}
        </div>
      )}
    </div>

    {/* Shipping Information */}
    <div className="w-full md:col-span-2 mt-4">
      <div
        className="flex justify-between items-center bg-gray-200 px-4 py-3 rounded-lg cursor-pointer"
        onClick={() => setShowShipping(!showShipping)}
      >
        <span className="font-bold">Shipping information</span>
        {showShipping ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showShipping && (
        <div className="mt-2 p-4 border rounded-lg bg-white text-gray-700">
          <p>Deliveries in Karachi are done within 2-3 days.</p>
          <p>All other cities take 3-4 days to deliver.</p>
          <p className="mt-2">Delivery charges are Rs.200. Free delivery for orders above 3000.</p>
          <p className="mt-2">Flash deliveries through dedicated dispatch center in Karachi.</p>
          <p className="mt-2">Kindly place your order at the earliest to get your product as soon as possible.</p>
          <p className="mt-2">Call us at 03111007862, or leave a voice note if you have any queries.</p>
        </div>
      )}
    </div>
  </div>
  );
}