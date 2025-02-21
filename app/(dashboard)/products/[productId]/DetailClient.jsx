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
        // console.log("response--->>>>", response.data[0])
        setSingleData(response.data[0])
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
         try {
           const response = await AddToCart(productId, quantity, "cart/addtocart")
           console.log("response", response.data.product[0])
           if (response.status == 200) {
             dispatch(addToCart(response?.data.product[0]))
             //   // getCartProducts()
            
           }
           else {
             console.log(response?.message)
           }
         } catch (error) {
           console.log("error", error)
         }
       };
     const handleAddToCartInSm = async (productId, quantity) => {
      //  dispatch(toggleDrawer())
       try {
       const response =await AddToCart(productId, quantity,"cart/addtocart")
         if(response.status){
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

      <span className=''>
        {
          isLoading? <span className='flex-grow max-w-screen-xl h-screen'><ProductDetailSkeleton/></span> : 
       <ProductDetail url={singleData.IMGURL ? singleData.IMGURL:`/Images/logoNew.png`} allFile={singleData.IMGURL} cartData={singleData} title={singleData?.PRODUCT_NAME} price={singleData?.PRICE} category={singleData.category}  comparePrice={singleData.COMPARE_PRICE}  
        description={singleData?.PRODUCT_DESCRIPTION}  onAddToCart={() => handleAddToCart(singleData.PRODUCT_ID,count)} onAddToCartInSm={() => handleAddToCartInSm(singleData.PRODUCT_ID,count)} addCount={addCount} decreaseCount ={decreaseCount} count={count}  /> 
        }
       </span>
       <ToastContainer/>
    {/*  </Suspense> */}
    </>
  )
}

export default ProductDetails
