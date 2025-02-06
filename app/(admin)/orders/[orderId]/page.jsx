import SingleOrderDetail from '@/components/SingleOrderDetail';
import React, { Suspense } from 'react'
import OrderSkeleton from './orderSkeleton';
import { getAllCartItem } from '@/API/response';
const SingleOrder = async ({params}) => {
    const {orderId} = params;
    try {
       const response = await getAllCartItem(`cart/admin/orders/${orderId}`);
      return (
        <Suspense fallback={<OrderSkeleton/>}>
        <SingleOrderDetail response = {response}/>
        </Suspense>
      )
      
    } catch (error) {
      console.log(error ||response.message)
      return <p>Error loading products</p>;
  
    }
}

export default SingleOrder
export  function generateMetadata (){
  return{
    title :"Orders Mystical Fragrance ",
    description: `Discover the ultimate shopping experience at Mystical Fragrance! Explore a wide range of products with category-wise browsing, seamless Add to Cart functionality, and secure checkout. Designed with Next.js and powered by Redux Toolkit for state management, our platform ensures fast, efficient, and reliable service. Join us now and shop with ease!`
  }
}