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
        // console.log("response--->>>>", response)
        setSingleData(response)
        setIsLoading(false)
      } catch (error) {
        errorNotify(error ||response.message)
      }
  }
  // get cart items
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
  // add to cart 
     const handleAddToCart = async (productId, quantity) => {
       dispatch(toggleDrawer())
       try {
       const response =await AddToCart(productId, quantity,"cart/addToCart")
         if(response.status == 200){
           dispatch(addToCart(response?.data?.cart?.items))
           getCartProducts()
           setCount(1)
         }
         else{
           console.log(response.message)
         }
       } catch (error) {
         console.log("error",error)
       }
     };
     const handleAddToCartInSm = async (productId, quantity) => {
      //  dispatch(toggleDrawer())
       try {
       const response =await AddToCart(productId, quantity,"cart/addToCart")
         if(response.status == 200){
           dispatch(addToCart(response?.data?.cart?.items))
           getCartProducts()
           setCount(1)
         }
         else{
           console.log(response.message)
         }
       } catch (error) {
         console.log("error",error)
       }
     };
  useEffect(()=>{
    getSingleProduct()
  },[])

  return (
    <>
    {/* <Suspense fallback={<ProductDetailSkeleton/>}> */}

      <span className='flex-grow max-w-screen-xl h-full'>
        {
          isLoading? <span className='flex-grow max-w-screen-xl h-screen'><ProductDetailSkeleton/></span> : 
       <ProductDetail url={singleData.images?singleData?.images[0]:`/Images/logoNew.png`} allFile={singleData.images} cartData={singleData} title={singleData?.name} price={singleData?.price} category={singleData.category}  comparePrice={singleData.comparePrice}  
        description={singleData?.description}  onAddToCart={() => handleAddToCart(singleData._id,count)} onAddToCartInSm={() => handleAddToCartInSm(singleData._id,count)} addCount={addCount} decreaseCount ={decreaseCount} count={count}  /> 
        }
       </span>
       <ToastContainer/>
    {/*  </Suspense> */}
    </>
  )
}

export default ProductDetails
