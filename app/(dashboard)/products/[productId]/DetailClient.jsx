"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { ProductDetail} from '@/components'
import ProductDetailSkeleton from './Detailloader';
import { errorNotify } from '@/components/Toast';
import { AddToCart,  getCartItem, getSingleProducts } from '@/API/response';
import { addToCart } from '@/GlobalRedux/Slices/addToCart';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getCartItemStart, getCartItemSuccess } from '@/GlobalRedux/Slices/allCartItems';
import { toggleDrawer } from '@/GlobalRedux/Slices/drawerCart';
import { closeAlert, openAlert } from '@/GlobalRedux/Slices/alertCart';
const ProductDetails = ({ response }) => {
  // console.log("client page ",response)
  const dispatch = useDispatch()
  const [singleData,setSingleData] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const [count, setCount] = useState(1)
  

// add to cart quantity
 const addCount = ()=>{
    setCount((prevCount )=> prevCount + 1  )
  }
  const decreaseCount = ()=>{
    if(count > 1 ){
      setCount((prevCount)=> prevCount - 1  )
    }
  }

  const getSingleProduct = async() => {
    try {
      // const route = `products/${Id}`
         setIsLoading(true)
        // const response = await getSingleProducts(route)
        // console.log("response--->>>>", response.data[0])
        setSingleData(response.data[0])
        setIsLoading(false)
      } catch (error) {
        errorNotify(error ||response.message)
      }
  }
    const showAlert = () => {
      dispatch(openAlert())
      setTimeout(()=>{
        dispatch(closeAlert())
      },3000)
    }
  // add to cart 
  const handleAddToCart = (cartItem, quantity) => {
    // Generate or get existing session ID
    let sessionId = localStorage.getItem("sessionID");
    if (!sessionId) {
      sessionId = `session_${Date.now()}`; // Generate unique session ID
      localStorage.setItem("sessionID", sessionId);
    }
  
    // Get existing cart data from local storage based on session ID
    let storedCart = localStorage.getItem("addCart");
    let allCarts = {};
  
    try {
      allCarts = JSON.parse(storedCart) || {};
      // If stored data is an array, reset it to an object
      if (Array.isArray(allCarts)) {
        allCarts = {};
      }
    } catch (error) {
      // If parsing fails, initialize as an empty object
      allCarts = {};
    }
  
    // Check if the session already has a cart, otherwise initialize it
    let existingCart = allCarts[sessionId] || [];
  
    // Check if the item already exists in the cart
    let itemIndex = existingCart.findIndex(
      (item) => item.PRODUCT_ID === cartItem.PRODUCT_ID
    );
  
    if (itemIndex !== -1) {
      // If item exists, update quantity
      existingCart[itemIndex].PRODUCT_QUANTITY += quantity;
    } else {
      // If item does not exist, set initial quantity to 1 and add to cart
      existingCart.push({ ...cartItem, PRODUCT_QUANTITY: quantity });
    }
  
    // Update the cart in local storage for this session ID
    allCarts[sessionId] = existingCart;
    localStorage.setItem("addCart", JSON.stringify(allCarts));
  
    // Open Drawer (assuming dispatch and toggleDrawer are defined)
    dispatch(toggleDrawer());
    setCount(1)
  };
  

     const handleAddToCartInSm = async (cartItem, quantity) => {
      let existingCart = JSON.parse(localStorage.getItem("addCart")) || [];

    // Check if the item already exists in the cart
    let itemIndex = existingCart.findIndex(item => item.PRODUCT_ID === cartItem.PRODUCT_ID);

    if (itemIndex !== -1) {
        // If item exists, update quantity based on user input
        existingCart[itemIndex].PRODUCT_QUANTITY += quantity;
    } else {
        // If item does not exist, set quantity to the user-selected value
        existingCart.push({ ...cartItem, PRODUCT_QUANTITY: quantity });
    }

    // Update Local Storage
    localStorage.setItem("addCart", JSON.stringify(existingCart));
    showAlert()
     };
  useEffect(()=>{
    getSingleProduct()
  },[])
  const cartStatus = useSelector((state) => state.drawercart.cartStatus);
  const [cartData, setCartData] = useState([]);
  const getSessionId = localStorage.getItem("sessionID")
   useEffect(() => {
        if (cartStatus) { // Only update cart data when drawer is opened
        let allCarts = JSON.parse(localStorage.getItem("addCart")) || {};
        let currentCart = allCarts[getSessionId] || [];
          setCartData(currentCart);
        console.log("cartData data-->>>>",cartData)
           
          }
      }, [cartStatus]);

  return (
    <>
    {/* <Suspense fallback={<ProductDetailSkeleton/>}> */}

      <span className=''>
        {
          isLoading? <span className='flex-grow max-w-screen-xl h-screen'><ProductDetailSkeleton/></span> : 
       <ProductDetail url={singleData.IMGURL ? singleData.IMGURL:`/Images/logoNew.png`} allFile={singleData.IMGURL} cartData={singleData} title={singleData?.PRODUCT_NAME} price={singleData?.PRICE} category={singleData.category}  comparePrice={singleData.COMPARE_PRICE}  
        description={singleData?.PRODUCT_DESCRIPTION}  onAddToCart={() => handleAddToCart(singleData,count)} onAddToCartInSm={() => handleAddToCartInSm(singleData,count)} addCount={addCount} decreaseCount ={decreaseCount} count={count}  /> 
        }
       </span>
       <ToastContainer/>
    {/*  </Suspense> */}
    </>
  )
}

export default ProductDetails
