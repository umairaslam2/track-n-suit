"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { ProductDetail} from '@/components'
import ProductDetailSkeleton from './Detailloader';
import { errorNotify } from '@/components/Toast';
import { AddToCart,  getCartItem, getSingleProducts } from '@/API/response';
import { addToCart } from '@/GlobalRedux/Slices/addToCart';
import { useDispatch } from 'react-redux';
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

    // Open Drawer
    dispatch(toggleDrawer());
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
